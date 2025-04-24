import dotenv from 'dotenv';
import { Provider, Wallet, createConfig } from 'fuels';
import { InsuranceContract, InsuranceNft } from './src/sway-contracts-api';

dotenv.config();

const NODE_URL = 'http://127.0.0.1:4000/v1/graphql';

export default createConfig({
  workspace: './../../packages/contracts',
  output: './src/sway-contracts-api',
  // providerUrl: process.env.VITE_FUELS_PROVIDER_URL,
  providerUrl: NODE_URL,
  privateKey:
    '0x875d16e8753c9fe4e03887fe7258832ff4771995df84f7e6bfd0064dc13dc1b1',
  autoStartFuelCore: true,
  snapshotDir: './snapshot',
  onDeploy: async (config, data) => {
    const contracts = data.contracts;

    console.log('contracts', contracts);

    const insuranceNft = contracts?.find((contract) => {
      console.log('insuranceNft', contract);
      return contract.name === 'insuranceNft';
    });

    if (!insuranceNft) {
      throw new Error('Insurance NFT not found');
    }

    const insuranceContract = contracts?.find((contract) => {
      console.log('insuranceContract', contract);
      return contract.name === 'insuranceContract';
    });

    if (!insuranceContract) {
      throw new Error('Insurance Contract not found');
    }

    const provider = new Provider(NODE_URL);
    const privateKey = process.env.OWNER_WALLET_SECRET as string;

    const wallet = Wallet.fromPrivateKey(privateKey, provider);

    console.log('Wallet address:', wallet.address.toB256());
    console.log('Wallet balance:', await wallet.getBalance());

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

      await insuranceNftContract.functions.constructor(
        { Address: { bits: wallet.address.toB256() } },
        { ContractId: { bits: insuranceContract.contractId } }
      );

      console.log('Owner initialized');
    } catch (err) {
      console.error(err);
    }
  },
});
