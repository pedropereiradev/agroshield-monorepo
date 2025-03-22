import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'fuels';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FuelProvider } from '@fuels/react';
import { defaultConnectors } from '@fuels/connectors';

const NETWORK_URL = 'https://testnet.fuel.network/v1/graphql';

const fuelProvider = new Provider(NETWORK_URL);
const chainId = await fuelProvider.getChainId();

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        fuelConfig={{
          connectors: defaultConnectors({
            devMode: true,
            fuelProvider,
            chainId,
          }),
        }}
        networks={[{ url: NETWORK_URL, chainId }]}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
