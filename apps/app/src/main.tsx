import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FuelProvider } from '@fuels/react';
import { defaultConnectors } from '@fuels/connectors';
import { Provider } from 'fuels';

const NETWORK_URL = 'https://testnet.fuel.network/v1/graphql';

const queryClient = new QueryClient();

const fuelProvider = new Provider(NETWORK_URL);
const chainId = await fuelProvider.getChainId();

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
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
