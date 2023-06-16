// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/N00unsDAOLogicV1.sol';

contract N00unsDAOLogicV1Harness is N00unsDAOLogicV1 {
    function initialize(
        address timelock_,
        address vrbs_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'N00unsDAO::initialize: admin only');
        require(address(timelock) == address(0), 'N00unsDAO::initialize: can only initialize once');

        timelock = IN00unsDAOExecutor(timelock_);
        vrbs = N00unsTokenLike(vrbs_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
