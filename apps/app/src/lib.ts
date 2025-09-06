import { getAppConfig, getContractsConfig } from '@agroshield/config';

export const environments = { LOCAL: 'local', TESTNET: 'testnet' };

const appConfig = getAppConfig();
const contractsConfig = getContractsConfig();

export const environment = appConfig.environment;
export const isLocal = environment === environments.LOCAL;
export const isTestnet = environment === environments.TESTNET;

export const localProviderUrl = `http://127.0.0.1:${contractsConfig.fuelNodePort}/v1/graphql`;
export const testnetProviderUrl = 'https://testnet.fuel.network/v1/graphql';
export const providerUrl = isLocal ? localProviderUrl : testnetProviderUrl;

// export const localContractId = contractIds.testContract;
export const testnetContractId = contractsConfig.testnetContractId;
// export const contractId = isLocal ? localContractId : testnetContractId;

export const testnetFaucetUrl = 'https://faucet-testnet.fuel.network/';
