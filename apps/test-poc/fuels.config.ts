import { createConfig } from 'fuels';

export default createConfig({
  contracts: [
        '../../packages/contracts/nft-insurance-contract',
  ],
  output: './src/sway-api',
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
