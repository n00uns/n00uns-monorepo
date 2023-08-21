import {
  ContractAddresses as VrbsContractAddresses,
  getContractAddressesForChainOrThrow,
} from '@vrbs/sdk';
import { ChainId } from '@usedapp/core';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
  usdcToken: string | undefined;
  chainlinkEthUsdc: string | undefined;
  payerContract: string | undefined;
  tokenBuyer: string | undefined;
  weth: string | undefined;
  steth: string | undefined;
}

export type ContractAddresses = VrbsContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains =
  | ChainId.Mainnet
  | ChainId.Hardhat
  | ChainId.Goerli
  | ChainId.Mumbai
  | ChainId.Polygon;

interface CacheBucket {
  name: string;
  version: string;
}

export const cache: Record<string, CacheBucket> = {
  seed: {
    name: 'seed',
    version: 'v1',
  },
  ens: {
    name: 'ens',
    version: 'v1',
  },
};

export const cacheKey = (bucket: CacheBucket, ...parts: (string | number)[]) => {
  return [bucket.name, bucket.version, ...parts].join('-').toLowerCase();
};

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '5');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.replace('-','').toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.replace('-','').toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Goerli]: {
    jsonRpcUri: createNetworkHttpUrl('goerli'),
    wsRpcUri: createNetworkWsUrl('goerli'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/vincecrypto/vrbs-subgraph2',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/vrbsdao/vrbs-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Polygon]: {
    jsonRpcUri: createNetworkHttpUrl('polygon-mainnet'),
    wsRpcUri: createNetworkWsUrl('polygon-mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/yanuar-ar/vrbs',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mumbai]: {
    jsonRpcUri: createNetworkHttpUrl('polygon-mumbai'),
    wsRpcUri: createNetworkWsUrl('polygon-mumbai'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/vrbs/mumbai',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://localhost:8000/subgraphs/name/vrbsdao/vrbs-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
};

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [ChainId.Goerli]: {
    lidoToken: '0x2DD6530F136D2B56330792D46aF959D9EA62E276',
    usdcToken: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    weth: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    steth: '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F',
    payerContract: '0x63F8445C4549d17DB181f9ADe1a126EfF8Ee72D6',
    tokenBuyer: '0x7Ee1fE5973c2F6e42D2D40c93f0FDed078c85770',
    chainlinkEthUsdc: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
  },
  [ChainId.Polygon]: {
    lidoToken: '0xC3C7d422809852031b44ab29EEC9F1EfF2A58756',
    usdcToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    weth: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    steth: '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F',
    payerContract: '0xD4A3bf1dF54699E63A2ef7F490E8E22b27B945f0',
    tokenBuyer: '0x61Ec4584c5B5eBaaD9f21Aac491fBB5B2ff30779',
    chainlinkEthUsdc: undefined,
  },
  [ChainId.Mumbai]: {
    lidoToken: '0xC3C7d422809852031b44ab29EEC9F1EfF2A58756',
    usdcToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    weth: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    steth: '0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F',
    payerContract: '0xD4A3bf1dF54699E63A2ef7F490E8E22b27B945f0',
    tokenBuyer: '0x61Ec4584c5B5eBaaD9f21Aac491fBB5B2ff30779',
    chainlinkEthUsdc: undefined,
  },
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    usdcToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    steth: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    chainlinkEthUsdc: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    payerContract: '0xd97Bcd9f47cEe35c0a9ec1dc40C1269afc9E8E1D',
    tokenBuyer: '0x4f2aCdc74f6941390d9b1804faBc3E780388cfe5',
  },
  [ChainId.Hardhat]: {
    lidoToken: undefined,
    usdcToken: undefined,
    weth: undefined,
    steth: undefined,
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
  },
};

const getAddresses = (): ContractAddresses => {
  let vrbsAddresses = {} as VrbsContractAddresses;
  try {
    vrbsAddresses = getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {}
  return { ...vrbsAddresses, ...externalAddresses[CHAIN_ID] };
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(),
};

export default config;

export const multicallOnLocalhost = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';
