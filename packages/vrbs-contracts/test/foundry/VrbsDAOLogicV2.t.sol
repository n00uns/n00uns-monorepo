// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import 'forge-std/Test.sol';
import { DAOLogicV2 } from '../../contracts/governance/DAOLogicV2.sol';
import { DAOProxyV2 } from '../../contracts/governance/DAOProxyV2.sol';
import { DAOStorageV2, DAOStorageV1Adjusted } from '../../contracts/governance/DAOInterfaces.sol';
import { DescriptorV2 } from '../../contracts/DescriptorV2.sol';
import { DeployUtils } from './helpers/DeployUtils.sol';
import { VrbsToken } from '../../contracts/VrbsToken.sol';
import { Seeder } from '../../contracts/Seeder.sol';
import { IProxyRegistry } from '../../contracts/external/opensea/IProxyRegistry.sol';
import { DAOExecutor } from '../../contracts/governance/DAOExecutor.sol';

contract VrbsDAOLogicV2Test is Test, DeployUtils {
    DAOLogicV2 daoLogic;
    DAOLogicV2 daoProxy;
    VrbsToken vrbsToken;
    DAOExecutor timelock = new DAOExecutor(address(1), TIMELOCK_DELAY);
    address vetoer = address(0x3);
    address admin = address(0x4);
    address vrbsDAO = address(0x5);
    address minter = address(0x6);
    address proposer = address(0x7);
    uint256 votingPeriod = 6000;
    uint256 votingDelay = 1;
    uint256 proposalThresholdBPS = 200;

    event Withdraw(uint256 amount, bool sent);

    function setUp() public virtual {
        daoLogic = new DAOLogicV2();

        DescriptorV2 descriptor = _deployAndPopulateV2();

        vrbsToken = new VrbsToken(vrbsDAO, minter, descriptor, new Seeder(), IProxyRegistry(address(0)));

        daoProxy = DAOLogicV2(
            payable(
                new DAOProxyV2(
                    address(timelock),
                    address(vrbsToken),
                    vetoer,
                    admin,
                    address(daoLogic),
                    votingPeriod,
                    votingDelay,
                    proposalThresholdBPS,
                    DAOStorageV2.DynamicQuorumParams({
                        minQuorumVotesBPS: 200,
                        maxQuorumVotesBPS: 2000,
                        quorumCoefficient: 10000
                    })
                )
            )
        );

        vm.prank(address(timelock));
        timelock.setPendingAdmin(address(daoProxy));
        vm.prank(address(daoProxy));
        timelock.acceptAdmin();
    }

    function propose(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data
    ) internal returns (uint256 proposalId) {
        vm.prank(proposer);
        address[] memory targets = new address[](1);
        targets[0] = target;
        uint256[] memory values = new uint256[](1);
        values[0] = value;
        string[] memory signatures = new string[](1);
        signatures[0] = signature;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = data;
        proposalId = daoProxy.propose(targets, values, signatures, calldatas, 'my proposal');
    }
}

contract CancelProposalTest is VrbsDAOLogicV2Test {
    uint256 proposalId;

    function setUp() public override {
        super.setUp();

        vm.prank(minter);
        vrbsToken.mint();

        vm.prank(minter);
        vrbsToken.transferFrom(minter, proposer, 1);

        vm.roll(block.number + 1);

        proposalId = propose(address(0x1234), 100, '', '');
    }

    function testProposerCanCancelProposal() public {
        vm.prank(proposer);
        daoProxy.cancel(proposalId);

        assertEq(uint256(daoProxy.state(proposalId)), uint256(DAOStorageV1Adjusted.ProposalState.Canceled));
    }

    function testNonProposerCantCancel() public {
        vm.expectRevert('VrbsDAO::cancel: proposer above threshold');
        daoProxy.cancel(proposalId);

        assertEq(uint256(daoProxy.state(proposalId)), uint256(DAOStorageV1Adjusted.ProposalState.Pending));
    }

    function testAnyoneCanCancelIfProposerVotesBelowThreshold() public {
        vm.prank(proposer);
        vrbsToken.transferFrom(proposer, address(0x9999), 1);

        vm.roll(block.number + 1);

        daoProxy.cancel(proposalId);

        assertEq(uint256(daoProxy.state(proposalId)), uint256(DAOStorageV1Adjusted.ProposalState.Canceled));
    }
}

contract WithdrawTest is VrbsDAOLogicV2Test {
    function setUp() public override {
        super.setUp();
    }

    function test_withdraw_worksForAdmin() public {
        vm.deal(address(daoProxy), 100 ether);
        uint256 balanceBefore = admin.balance;

        vm.expectEmit(true, true, true, true);
        emit Withdraw(100 ether, true);

        vm.prank(admin);
        (uint256 amount, bool sent) = daoProxy._withdraw();

        assertEq(amount, 100 ether);
        assertTrue(sent);
        assertEq(admin.balance - balanceBefore, 100 ether);
    }

    function test_withdraw_revertsForNonAdmin() public {
        vm.expectRevert(DAOLogicV2.AdminOnly.selector);
        daoProxy._withdraw();
    }
}
