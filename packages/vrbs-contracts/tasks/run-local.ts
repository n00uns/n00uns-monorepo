import { TASK_COMPILE, TASK_NODE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';

task(
  'run-local',
  'Start a hardhat node, deploy contracts, and execute setup transactions',
).setAction(async (_, { ethers, run }) => {
  await run(TASK_COMPILE);

  await Promise.race([
    run(TASK_NODE, { hostname: '0.0.0.0' }),
    new Promise(resolve => setTimeout(resolve, 2_000)),
  ]);

  const contracts = await run('deploy-local');

 

  await contracts.AuctionHouse.instance
    .attach(contracts.AuctionHouseProxy.instance.address)
    .unpause({
      gasLimit: 1_000_000,
    });

  // Transfer ownership
  const executorAddress = contracts.DAOExecutor.instance.address;
  //await contracts.DescriptorV2.instance.transferOwnership(executorAddress);
  //await contracts.VrbsToken.instance.transferOwnership(executorAddress);
  await contracts.AuctionHouseProxyAdmin.instance.transferOwnership(executorAddress);
  await contracts.AuctionHouse.instance
    .attach(contracts.AuctionHouseProxy.instance.address)
    .transferOwnership(executorAddress);
  console.log(
    'Transferred ownership of the descriptor, token, and proxy admin contracts to the executor.',
  );

  // await run('create-proposal', {
  //   vrbsDaoProxy: contracts.DAOProxyV2.instance.address,
  // });

  const { chainId } = await ethers.provider.getNetwork();

  const accounts = {
    'Account #0': {
      Address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      'Private Key': '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    },
    'Account #1': {
      Address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      'Private Key': '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    },
  };

  console.table(accounts);
  console.log(
    `Vrb contracts deployed to local node at http://localhost:8545 (Chain ID: ${chainId})`,
  );
  console.log(`Auction House Proxy address: ${contracts.AuctionHouseProxy.instance.address}`);
  console.log(`Vrbs ERC721 address: ${contracts.VrbsTokenV2.instance.address}`);
  console.log(`Vrbs DAO Executor address: ${contracts.DAOExecutor.instance.address}`);
  console.log(`Vrbs DAO Proxy address: ${contracts.DAOProxyV2.instance.address}`);

  await ethers.provider.send('evm_setIntervalMining', [12_000]);

  await new Promise(() => {
    /* keep node alive until this process is killed */
  });
});