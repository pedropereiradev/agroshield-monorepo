import dotenv from 'dotenv';
import { Provider, Wallet, createConfig } from 'fuels';
import {
  InsuranceContract,
  InsuranceManager,
  InsuranceNft,
} from './src/sway-programs-api';

dotenv.config();

const providerUrl = process.env.VITE_FUELS_PROVIDER_URL;
const privateKey = process.env.VITE_FUELS_PRIVATE_KEY;

if (!providerUrl || !privateKey) {
  throw new Error('Missing environment variables');
}

export default createConfig({
  workspace: './sway',
  output: './src/sway-programs-api',
  providerUrl,
  privateKey,
  autoStartFuelCore: true,
  fuelCorePort: 4000,
  onDeploy: async (_config, data) => {
    const contracts = data.contracts;

    const insuranceNft = contracts?.find((contract) => {
      return contract.name === 'insuranceNft';
    });
    const insuranceContract = contracts?.find((contract) => {
      return contract.name === 'insuranceContract';
    });
    const insuranceManager = contracts?.find((contract) => {
      return contract.name === 'insuranceManager';
    });

    if (!insuranceNft || !insuranceContract || !insuranceManager) {
      throw new Error('Insurance Contracts not found');
    }

    const provider = new Provider(providerUrl);
    const wallet = Wallet.fromPrivateKey(privateKey, provider);

    const contractInstance = new InsuranceContract(
      insuranceContract.contractId,
      wallet
    );
    const nftContractInstance = new InsuranceNft(
      insuranceNft.contractId,
      wallet
    );
    const managerContractInstance = new InsuranceManager(
      insuranceManager.contractId,
      wallet
    );

    try {
      const contractConstructor = await contractInstance.functions
        .constructor(
          { bits: wallet.address.toB256() },
          { bits: insuranceNft.contractId },
          { bits: insuranceManager.contractId }
        )
        .call();

      await contractConstructor.waitForResult();

      const nftContractConstructor = await nftContractInstance.functions
        .constructor(
          {
            Address: { bits: wallet.address.toB256() },
          },
          { ContractId: { bits: insuranceContract.contractId } }
        )
        .call();

      await nftContractConstructor.waitForResult();

      const managerContractConstructor = await managerContractInstance.functions
        .constructor(
          {
            Address: { bits: wallet.address.toB256() },
          },
          { ContractId: { bits: insuranceContract.contractId } }
        )
        .call();

      await managerContractConstructor.waitForResult();
    } catch (err) {
      console.error(err);
    }
  },
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
