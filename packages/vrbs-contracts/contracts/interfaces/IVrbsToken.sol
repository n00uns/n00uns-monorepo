// SPDX-License-Identifier: GPL-3.0

/// @title Interface for VrbsToken

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

pragma solidity ^0.8.6;

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import { IDescriptorMinimal } from './IDescriptorMinimal.sol';
import { ISeeder } from './ISeeder.sol';

interface IVrbsToken is IERC721 {
    event VrbCreated(uint256 indexed tokenId, ISeeder.Seed seed);

    event VrbBurned(uint256 indexed tokenId);

    event VrbsDAOUpdated(address vrbsDAO);

    event MinterUpdated(address minter);

    event MinterLocked();

    event DescriptorUpdated(IDescriptorMinimal descriptor);

    event DescriptorLocked();

    event SeederUpdated(ISeeder seeder);

    event SeederLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function dataURI(uint256 tokenId) external returns (string memory);

    function setVrbsDAO(address vrbsDAO) external;

    function setMinter(address minter) external;

    function lockMinter() external;

    function setDescriptor(IDescriptorMinimal descriptor) external;

    function lockDescriptor() external;

    function setSeeder(ISeeder seeder) external;

    function lockSeeder() external;
}
