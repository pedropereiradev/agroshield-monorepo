export const environments = { LOCAL: 'local', TESTNET: 'testnet' };
export const environment =
  process.env.VITE_DAPP_ENVIRONMENT || environments.LOCAL;
export const isLocal = environment === environments.LOCAL;
export const isTestnet = environment === environments.TESTNET;

export const localProviderUrl = `http://127.0.0.1:${process.env.VITE_FUEL_NODE_PORT || 4000}/v1/graphql`;
export const testnetProviderUrl = 'https://testnet.fuel.network/v1/graphql';
export const providerUrl = isLocal ? localProviderUrl : testnetProviderUrl;

// export const localContractId = contractIds.testContract;
export const testnetContractId = process.env.VITE_TESTNET_CONTRACT_ID as string;
// export const contractId = isLocal ? localContractId : testnetContractId;

export const testnetFaucetUrl = 'https://faucet-testnet.fuel.network/';
