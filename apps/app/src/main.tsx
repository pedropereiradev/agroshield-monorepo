import { FuelWalletConnector } from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CHAIN_IDS } from 'fuels';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const query = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <FuelProvider
        theme="light"
        fuelConfig={{
          //   connectors: defaultConnectors({
          //     fuelProvider: new Provider(
          //       'https://testnet.fuel.network/v1/graphql'
          //     ),
          //     chainId: CHAIN_IDS.fuel.testnet,
          //   }),
          connectors: [new FuelWalletConnector()],
        }}
        networks={[
          {
            // url: 'https://testnet.fuel.network/v1/graphql',
            url: 'http://127.0.0.1:4000/v1/graphql',
            chainId: CHAIN_IDS.fuel.testnet,
          },
        ]}
        uiConfig={{ suggestBridge: false }}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
