// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import 'forge-std/Test.sol';
import { VrbsDAOLogicSharedBaseTest } from './helpers/VrbsDAOLogicSharedBase.t.sol';
import { DAOLogicV1 } from '../../contracts/governance/DAOLogicV1.sol';
import { DAOLogicV2 } from '../../contracts/governance/DAOLogicV2.sol';
import { DAOProxy } from '../../contracts/governance/DAOProxy.sol';
import { VrbsToken } from '../../contracts/VrbsToken.sol';
import { DAOExecutor } from '../../contracts/governance/DAOExecutor.sol';
import { VrbsDAOStorageV1, DAOStorageV2 } from '../../contracts/governance/DAOInterfaces.sol';

contract VrbsDAOUpgradeToV2 is VrbsDAOLogicSharedBaseTest {
    uint16 public constant MIN_QUORUM_BPS = 1000;
    uint16 public constant MAX_QUORUM_BPS = 4000;
    uint32 public constant COEFFICIENT = 1.5e6;

    address voter;

    function setUp() public override {
        super.setUp();
        voter = utils.getNextUserAddress();
    }

    function daoVersion() internal pure override returns (uint256) {
        return 1;
    }

    function deployDAOProxy() internal override returns (DAOLogicV1) {
        DAOLogicV1 daoLogic = new DAOLogicV1();

        return
            DAOLogicV1(
                payable(
                    new DAOProxy(
                        address(timelock),
                        address(vrbsToken),
                        vetoer,
                        address(timelock),
                        address(daoLogic),
                        votingPeriod,
                        votingDelay,
                        proposalThresholdBPS,
                        1000
                    )
                )
            );
    }

    function testV1Sanity_proposalFailsBelowQuorum() public {
        mint(proposer, 20);
        mint(voter, 1);
        uint256 proposalId = propose(address(0x1234), 100, '', '');
        vm.roll(block.number + daoProxy.votingDelay() + 1);

        // quorum should be 2 because total supply is 21 and quorum BPs is 10%
        vote(voter, proposalId, 1);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        assertTrue(daoProxy.state(proposalId) == VrbsDAOStorageV1.ProposalState.Defeated);
    }

    function testV1Sanity_proposalSucceedsWithForVotesMoreThanQuorum() public {
        // quorum should be 2 because total supply is 21 and quorum BPs is 10%
        // this puts voter at 3 tokens, above quorum
        mint(proposer, 20);
        mint(voter, 2);
        uint256 proposalId = propose(address(0x1234), 100, '', '');
        vm.roll(block.number + daoProxy.votingDelay() + 1);

        vote(voter, proposalId, 1);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        assertTrue(daoProxy.state(proposalId) == VrbsDAOStorageV1.ProposalState.Succeeded);
    }

    function testUpgradeToV2() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        mint(voter, 2);

        proposeAndExecuteUpgradeToV2AndSetDQParams(address(daoLogicV2));
        address implementationPostUpgrade = DAOProxy(payable(address(daoProxy))).implementation();

        assertEq(implementationPostUpgrade, address(daoLogicV2));

        DAOLogicV2 daoV2 = DAOLogicV2(payable(address(daoProxy)));
        DAOStorageV2.DynamicQuorumParams memory dqParams = daoV2.getDynamicQuorumParamsAt(block.number);
        assertEq(dqParams.minQuorumVotesBPS, MIN_QUORUM_BPS);
        assertEq(dqParams.maxQuorumVotesBPS, MAX_QUORUM_BPS);
        assertEq(dqParams.quorumCoefficient, COEFFICIENT);
    }

    function testUpgradeToV2_withV1PropInFlightWithAgainstVotesStillPasses() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        address forVoter = utils.getNextUserAddress();
        address againstVoter = utils.getNextUserAddress();
        mint(forVoter, 3);
        mint(againstVoter, 2);

        uint256 v1PropId = propose(forVoter, address(0x1234), 100, '', '');

        uint256 v2UpgradeProposalId = proposeUpgradeToV2AndSetDQParams(address(daoLogicV2));
        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(forVoter, v2UpgradeProposalId, 1);

        vote(forVoter, v1PropId, 1);
        vote(againstVoter, v1PropId, 0);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        daoProxy.queue(v2UpgradeProposalId);
        vm.warp(block.timestamp + timelock.delay() + 1);
        daoProxy.execute(v2UpgradeProposalId);

        assertTrue(daoProxy.state(v1PropId) == VrbsDAOStorageV1.ProposalState.Succeeded);
    }

    function testUpgradeToV2_newV2Prop_failsBecauseOfDQ() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        mint(voter, 2);
        address forVoter = utils.getNextUserAddress();
        address againstVoter = utils.getNextUserAddress();
        mint(forVoter, 3);
        mint(againstVoter, 2);

        proposeAndExecuteUpgradeToV2AndSetDQParams(address(daoLogicV2));

        uint256 newPropId = propose(forVoter, address(0x1234), 100, '', '');
        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(forVoter, newPropId, 1);
        vote(againstVoter, newPropId, 0);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        assertTrue(daoProxy.state(newPropId) == VrbsDAOStorageV1.ProposalState.Defeated);
    }

    function testUpgradeToV2_newV2Prop_succeedsWithEnoughForVotes() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        mint(voter, 2);
        address forVoter = utils.getNextUserAddress();
        address againstVoter = utils.getNextUserAddress();
        mint(forVoter, 4);
        mint(againstVoter, 2);

        proposeAndExecuteUpgradeToV2AndSetDQParams(address(daoLogicV2));

        uint256 newPropId = propose(forVoter, address(0x1234), 100, '', '');
        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(forVoter, newPropId, 1);
        vote(againstVoter, newPropId, 0);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        assertTrue(daoProxy.state(newPropId) == VrbsDAOStorageV1.ProposalState.Succeeded);
    }

    function testUpgradeToV2_dqParamsChange_newPropMustPassNewDQ() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        mint(voter, 2);
        proposeAndExecuteUpgradeToV2AndSetDQParams(address(daoLogicV2));
        proposeAndExecuteSetDQParams(MIN_QUORUM_BPS, MAX_QUORUM_BPS, 2.5e6);

        address forVoter = utils.getNextUserAddress();
        address againstVoter = utils.getNextUserAddress();
        mint(forVoter, 2);
        mint(againstVoter, 1);

        uint256 newPropId = propose(forVoter, address(0x1234), 100, '', '');
        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(forVoter, newPropId, 1);
        vote(againstVoter, newPropId, 0);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        assertTrue(daoProxy.state(newPropId) == VrbsDAOStorageV1.ProposalState.Defeated);
    }

    function testUpgradeToV2_dqParamsChange_doesNotAffectExistingProposal() public {
        DAOLogicV2 daoLogicV2 = new DAOLogicV2();
        mint(proposer, 2);
        mint(voter, 2);
        proposeAndExecuteUpgradeToV2AndSetDQParams(address(daoLogicV2));

        address forVoter = utils.getNextUserAddress();
        address againstVoter = utils.getNextUserAddress();
        mint(forVoter, 2);
        mint(againstVoter, 1);

        uint256 dqParamsPropId = proposeSetDQParams(MIN_QUORUM_BPS, MAX_QUORUM_BPS, 2.5e6);
        uint256 newPropId = propose(forVoter, address(0x1234), 100, '', '');

        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(forVoter, newPropId, 1);
        vote(againstVoter, newPropId, 0);
        vote(forVoter, dqParamsPropId, 1);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);

        daoProxy.queue(dqParamsPropId);
        vm.warp(block.timestamp + timelock.delay() + 1);
        daoProxy.execute(dqParamsPropId);
        vm.roll(block.number + 1);

        assertTrue(daoProxy.state(newPropId) == VrbsDAOStorageV1.ProposalState.Succeeded);
    }

    function proposeAndExecuteUpgradeToV2AndSetDQParams(address daoLogicV2) internal returns (uint256 proposalId) {
        proposalId = proposeUpgradeToV2AndSetDQParams(daoLogicV2);
        executeProposal(proposalId);
    }

    function proposeUpgradeToV2AndSetDQParams(address daoLogicV2) internal returns (uint256 proposalId) {
        address[] memory targets = new address[](2);
        targets[0] = address(daoProxy);
        targets[1] = address(daoProxy);

        uint256[] memory values = new uint256[](2);
        values[0] = 0;
        values[1] = 0;

        string[] memory signatures = new string[](2);
        signatures[0] = '_setImplementation(address)';
        signatures[1] = '_setDynamicQuorumParams(uint16,uint16,uint32)';

        bytes[] memory calldatas = new bytes[](2);
        calldatas[0] = abi.encode(daoLogicV2);
        calldatas[1] = abi.encode(MIN_QUORUM_BPS, MAX_QUORUM_BPS, COEFFICIENT);

        vm.prank(proposer);
        proposalId = daoProxy.propose(targets, values, signatures, calldatas, 'upgrade to DAO V2');
    }

    function proposeAndExecuteSetDQParams(
        uint16 minQuorumBPs,
        uint16 maxQuorumBPs,
        uint32 coefficient
    ) internal returns (uint256 proposalId) {
        proposalId = proposeSetDQParams(minQuorumBPs, maxQuorumBPs, coefficient);
        executeProposal(proposalId);
    }

    function proposeSetDQParams(
        uint16 minQuorumBPs,
        uint16 maxQuorumBPs,
        uint32 coefficient
    ) internal returns (uint256 proposalId) {
        address[] memory targets = new address[](1);
        targets[0] = address(daoProxy);

        uint256[] memory values = new uint256[](1);
        values[0] = 0;

        string[] memory signatures = new string[](1);
        signatures[0] = '_setDynamicQuorumParams(uint16,uint16,uint32)';

        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encode(minQuorumBPs, maxQuorumBPs, coefficient);

        vm.prank(proposer);
        proposalId = daoProxy.propose(targets, values, signatures, calldatas, 'upgrade to DAO V2');
    }

    function executeProposal(uint256 proposalId) internal {
        vm.roll(block.number + daoProxy.votingDelay() + 1);
        vote(voter, proposalId, 1);
        vm.roll(block.number + daoProxy.votingPeriod() + 1);
        daoProxy.queue(proposalId);
        vm.warp(block.timestamp + timelock.delay() + 1);
        daoProxy.execute(proposalId);
        vm.roll(block.number + 1);
    }
}
