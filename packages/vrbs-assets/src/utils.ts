import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { VrbSeed, VrbData } from './types';
import { images, bgcolors, fullImages } from './image-data.json';

const { bodies, accessories, heads, glasses } = images;

type ObjectKey = keyof typeof images;

/**
 * Get encoded part and background information using a Vrb seed
 * @param seed The Vrb seed
 */
export const getVrbData = (vrbId: string): VrbData => {
  const parsedVrbId = parseInt(vrbId, 10);

  return {
    fullImage: (fullImages[parsedVrbId])
  };
};

/**
 * Generate a random Vrb seed
 * @param seed The Vrb seed
 */
export const getRandomVrbSeed = (): VrbSeed => {
  return {
    background: Math.floor(Math.random() * bgcolors.length),
    body: Math.floor(Math.random() * bodies.length),
    accessory: Math.floor(Math.random() * accessories.length),
    head: Math.floor(Math.random() * heads.length),
    glasses: Math.floor(Math.random() * glasses.length),
  };
};

/**
 * Emulate bitwise right shift and uint cast
 * @param value A Big Number
 * @param shiftAmount The amount to right shift
 * @param uintSize The uint bit size to cast to
 */
export const shiftRightAndCast = (
  value: BigNumberish,
  shiftAmount: number,
  uintSize: number,
): string => {
  const shifted = BigNumber.from(value).shr(shiftAmount).toHexString();
  return `0x${shifted.substring(shifted.length - uintSize / 4)}`;
};

/**
 * Emulates the Seeder.sol methodology for pseudorandomly selecting a part
 * @param pseudorandomness Hex representation of a number
 * @param partCount The number of parts to pseudorandomly choose from
 * @param shiftAmount The amount to right shift
 * @param uintSize The size of the unsigned integer
 */
export const getPseudorandomPart = (
  pseudorandomness: string,
  partCount: number,
  shiftAmount: number,
  uintSize = 48,
): number => {
  const hex = shiftRightAndCast(pseudorandomness, shiftAmount, uintSize);
  return BigNumber.from(hex).mod(partCount).toNumber();
};

/**
 * Emulates the Seeder.sol methodology for generating a Vrb seed
 * @param vrbId The Vrb tokenId used to create pseudorandomness
 * @param blockHash The block hash use to create pseudorandomness
 */
export const getVrbSeedFromBlockHash = (vrbId: BigNumberish, blockHash: string): VrbSeed => {
  const pseudorandomness = solidityKeccak256(['bytes32', 'uint256'], [blockHash, vrbId]);
  return {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
    head: getPseudorandomPart(pseudorandomness, heads.length, 144),
    glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192),
  };
};

/**
 * Get encoded part information for one trait
 * @param partType The label of the part type to use
 * @param partIndex The index within the image data array of the part to get
 */
export const getPartData = (partType: string, partIndex: number): string => {
  const part = partType as ObjectKey;
  return images[part][partIndex].data;
};
