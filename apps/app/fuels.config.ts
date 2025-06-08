import dotenv from 'dotenv';
import { Provider, Wallet, createConfig } from 'fuels';
import { InsuranceContract, InsuranceNft } from './src/sway-contracts-api';

dotenv.config();

export default createConfig({
  workspace: './../../packages/contracts',
  output: './src/sway-contracts-api',
  providerUrl: process.env.VITE_FUELS_PROVIDER_URL,
  privateKey: process.env.VITE_FUELS_PRIVATE_KEY,
  autoStartFuelCore: false,
  onDeploy: async (_config, data) => {
    const contracts = data.contracts;

    console.log('contracts', contracts);

    const insuranceNft = contracts?.find((contract) => {
      return contract.name === 'insuranceNft';
    });

    if (!insuranceNft) {
      throw new Error('Insurance NFT not found');
    }

    const insuranceContract = contracts?.find((contract) => {
      return contract.name === 'insuranceContract';
    });

    if (!insuranceContract) {
      throw new Error('Insurance Contract not found');
    }

    const provider = new Provider(
      process.env.VITE_FUELS_PROVIDER_URL as string
    );
    const privateKey = process.env.OWNER_WALLET_SECRET as string;

    const wallet = Wallet.fromPrivateKey(privateKey, provider);

    const insuranceManagerContract = new InsuranceContract(
      insuranceContract.contractId,
      wallet
    );
    const insuranceNftContract = new InsuranceNft(
      insuranceNft.contractId,
      wallet
    );

    try {
      await insuranceManagerContract.functions
        .constructor(
          { bits: wallet.address.toB256() },
          { bits: insuranceNft.contractId }
        )
        .call();

      insuranceNftContract.functions.constructor(
        { Address: { bits: wallet.address.toB256() } },
        { ContractId: { bits: insuranceContract.contractId } }
      );

      console.log('Owner initialized');
    } catch (err) {
      console.error(err);
    }
  },
});
