import { defaultConnectors } from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CHAIN_IDS } from 'fuels';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Toaster } from '@/components/ui/sonner';

const query = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <FuelProvider
        theme="light"
        fuelConfig={{
          connectors: defaultConnectors({
            wcProjectId: import.meta.env.VITE_WC_PROJECT_ID,
          }),
        }}
        networks={[
          {
            url: import.meta.env.VITE_FUELS_PROVIDER_URL,
            chainId: CHAIN_IDS.fuel.testnet,
          },
        ]}
        uiConfig={{ suggestBridge: false }}
      >
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
