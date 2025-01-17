// SPDX-License-Identifier: GPL-3.0

/// @title The Vrbs DAO auction house

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░██░░░████░░██░░░████░░░ *
 * ░░██████░░░████████░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

// LICENSE
// AuctionHouse.sol is a modified version of Zora's AuctionHouse.sol:
// https://github.com/ourzora/auction-house/blob/54a12ec1a6cf562e49f0a4917990474b11350a2d/contracts/AuctionHouse.sol
//
// AuctionHouse.sol source code Copyright Zora licensed under the GPL-3.0 license.
// With modifications by Vrbs DAO.

pragma solidity ^0.8.6;

import { PausableUpgradeable } from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { IAuctionHouse } from './interfaces/IAuctionHouse.sol';
import { IVrbsToken } from './interfaces/IVrbsToken.sol';
import { IWETH } from './interfaces/IWETH.sol';

contract AuctionHouse is
    IAuctionHouse,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable
{
    // The Vrbs ERC721 token contract
    IVrbsToken public vrbs;

    // The address of the WETH contract
    address public weth;

    // The minimum amount of time left in an auction after a new bid is created
    uint256 public timeBuffer;

    // The minimum price accepted in an auction
    uint256 public reservePrice;

    // The minimum percentage difference between the last bid amount and the current bid
    uint8 public minBidIncrementPercentage;

    // The duration of a single auction
    uint256 public duration;

    // The active auction
    IAuctionHouse.Auction public auction;

 IERC20 public biddingToken;

 uint256[] public availableTokenIds;

 // Array to store the addresses that will receive a portion of the auction proceeds
address payable[] public beneficiaries;
// Array to store the corresponding percentages for each beneficiary
uint8[] public beneficiaryPercentages;


    /**
     * @notice Initialize the auction house and base contracts,
     * populate configuration values, and pause the contract.
     * @dev This function can only be called once.
     */
    function initialize(
        IVrbsToken _vrbs,
        address _weth,
        uint256 _timeBuffer,
        uint256 _reservePrice,
        uint8 _minBidIncrementPercentage,
        uint256 _duration
    ) external initializer {
        __Pausable_init();
        __ReentrancyGuard_init();
        __Ownable_init();

        _pause();

        vrbs = _vrbs;
        weth = _weth;
        timeBuffer = _timeBuffer;
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        duration = _duration;
    }

    /**
     * @notice Settle the current auction, mint a new Vrb, and put it up for auction.
     */
    function settleCurrentAndCreateNewAuction() external override nonReentrant whenNotPaused {
        _settleAuction();
        _createAuction();
    }

    /**
     * @notice Settle the current auction.
     * @dev This function can only be called when the contract is paused.
     */
    function settleAuction() external override whenPaused nonReentrant {
        _settleAuction();
    }

  

   
     function createBid(uint256 vrbId) external payable override nonReentrant {
        IAuctionHouse.Auction memory _auction = auction;

        require(_auction.vrbId == vrbId, 'Vrb not up for auction');
        require(block.timestamp < _auction.endTime, 'Auction expired');
        require(msg.value >= reservePrice, 'Must send at least reservePrice');
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            'Must send more than last bid by minBidIncrementPercentage amount'
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            _safeTransferETHWithFallback(lastBidder, _auction.amount);
        }

        auction.amount = msg.value;
        auction.bidder = payable(msg.sender);

        // Extend the auction if the bid was received within `timeBuffer` of the auction end time
        bool extended = _auction.endTime - block.timestamp < timeBuffer;
        if (extended) {
            auction.endTime = _auction.endTime = block.timestamp + timeBuffer;
        }

        emit AuctionBid(_auction.vrbId, msg.sender, msg.value, extended);

        if (extended) {
            emit AuctionExtended(_auction.vrbId, _auction.endTime);
        }
    }

 


function setBeneficiaries(address payable[] calldata _beneficiaries, uint8[] calldata _beneficiaryPercentages) external onlyOwner {
    require(_beneficiaries.length == _beneficiaryPercentages.length, "Input arrays must have the same length");
    uint8 totalPercentage;
    for(uint i = 0; i < _beneficiaryPercentages.length; i++) {
        totalPercentage += _beneficiaryPercentages[i];
    }
    require(totalPercentage == 100, "Total percentages must add up to 100");

    beneficiaries = _beneficiaries;
    beneficiaryPercentages = _beneficiaryPercentages;
}



    /**
     * @notice Pause the Vrbs auction house.
     * @dev This function can only be called by the owner when the
     * contract is unpaused. While no new auctions can be started when paused,
     * anyone can settle an ongoing auction.
     */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the Vrbs auction house.
     * @dev This function can only be called by the owner when the
     * contract is paused. If required, this function will start a new auction.
     */
    function unpause() external override onlyOwner {
        _unpause();

        if (auction.startTime == 0 || auction.settled) {
            _createAuction();
        }
    }

    /**
     * @notice Set the auction time buffer.
     * @dev Only callable by the owner.
     */
    function setTimeBuffer(uint256 _timeBuffer) external override onlyOwner {
        timeBuffer = _timeBuffer;

        emit AuctionTimeBufferUpdated(_timeBuffer);
    }

    /**
     * @notice Set the auction reserve price.
     * @dev Only callable by the owner.
     */
    function setReservePrice(uint256 _reservePrice) external override onlyOwner {
        reservePrice = _reservePrice;

        emit AuctionReservePriceUpdated(_reservePrice);
    }

    /**
     * @notice Set the auction minimum bid increment percentage.
     * @dev Only callable by the owner.
     */
    function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage) external override onlyOwner {
        minBidIncrementPercentage = _minBidIncrementPercentage;

        emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
    }

    

    function _createAuction() internal {
        require(availableTokenIds.length > 0, "No available tokens to auction");

        // Get a random index
        uint256 randomIndex = _getRandomIndex(availableTokenIds.length);

        // Get the tokenId from the random index
        uint256 tokenId = availableTokenIds[randomIndex];

        // Remove the token from the list of available tokens
        _removeFromavailableTokenIds(randomIndex);

        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;

        auction = Auction({
            vrbId: tokenId,
            amount: 0,
            startTime: startTime,
            endTime: endTime,
            bidder: payable(0),
            settled: false
        });

        emit AuctionCreated(tokenId, startTime, endTime);
    }

   
    function _settleAuction() internal {
    IAuctionHouse.Auction memory _auction = auction;

    require(_auction.startTime != 0, "Auction hasn't begun");
    require(!_auction.settled, 'Auction has already been settled');
    require(block.timestamp >= _auction.endTime, "Auction hasn't completed");

    auction.settled = true;

    if (_auction.bidder == address(0)) {
        vrbs.burn(_auction.vrbId);
    } else {
        vrbs.transferFrom(address(this), _auction.bidder, _auction.vrbId);
        
    }

    if (_auction.amount > 0) {
       for (uint i = 0; i < beneficiaries.length; i++) {
            uint256 share = _auction.amount * beneficiaryPercentages[i] / 100;

              _safeTransferETHWithFallback(owner(),share);
        }
    }

    emit AuctionSettled(_auction.vrbId, _auction.bidder, _auction.amount);
}


  

  /**
     * @notice Add multiple token IDs to the available list.
     * @dev This function can only be called by the owner.
     */
    function addTokenIds(uint256[] calldata _tokenIds) external onlyOwner {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            availableTokenIds.push(_tokenIds[i]);
        }

    }

// Random index generator
function _getRandomIndex(uint256 _length) internal view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % _length;
}

// Remove token from available tokens list
function _removeFromavailableTokenIds(uint256 index) internal {
    availableTokenIds[index] = availableTokenIds[availableTokenIds.length-1];
    availableTokenIds.pop();
}


    /**
     * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     */
    function _safeTransferETHWithFallback(address to, uint256 amount) internal {
        if (!_safeTransferETH(to, amount)) {
            IWETH(weth).deposit{ value: amount }();
            IERC20(weth).transfer(to, amount);
        }
    }

    /**
     * @notice Transfer ETH and return the success status.
     * @dev This function only forwards 30,000 gas to the callee.
     */
    function _safeTransferETH(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
        return success;
    }
}