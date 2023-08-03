import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// Use salt for deterministic deployment
const SALT = ethers.constants.HashZero;

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("$PRIVATE_KEY is missing");

export default async function (hre) {
  console.log(`Running deploy script`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  // Load contract
  const artifact = await deployer.loadArtifact("ZkSyncSingletonFactory");

  // Currently zkSync deploy doesn't support create2, so generate calldata & deploy manually
  const bytecodeHash = utils.hashBytecode(artifact.bytecode);
  const data = utils.CONTRACT_DEPLOYER.encodeFunctionData('create2', [SALT, bytecodeHash, "0x"]);
  const transaction = await deployer.zkWallet.sendTransaction({to: utils.CONTRACT_DEPLOYER_ADDRESS, data, customData: {factoryDeps: [artifact.bytecode]} });
  await transaction.wait();

  const contractAddress = utils.create2Address(wallet.address, bytecodeHash, SALT, "0x");

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
