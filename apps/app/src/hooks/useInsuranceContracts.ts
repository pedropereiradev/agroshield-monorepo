import { InsuranceContract, InsuranceNft } from '@/sway-contracts-api';
import { useWallet } from '@fuels/react';
import { useEffect, useState } from 'react';
import {
  insuranceContract,
  insuranceNft,
} from '../sway-contracts-api/contract-ids.json';

const INSURANCE_MANAGER_CONTRACT_ID = insuranceContract;
const INSURANCE_NFT_CONTRACT_ID = insuranceNft;

if (!INSURANCE_MANAGER_CONTRACT_ID || !INSURANCE_NFT_CONTRACT_ID) {
  throw new Error(
    'Please set VITE_INSURANCE_CONTRACT_ID and VITE_INSURANCE_NFT_CONTRACT_ID in your .env file'
  );
}

export function useInsuranceContracts() {
  const { wallet } = useWallet();
  const [insuranceContract, setInsuranceContract] =
    useState<InsuranceContract>();
  const [nftContract, setNftContract] = useState<InsuranceNft>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeContracts() {
      if (!wallet) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const insuranceContract = new InsuranceContract(
          INSURANCE_MANAGER_CONTRACT_ID as string,
          wallet
        );

        const nftContract = new InsuranceNft(
          INSURANCE_NFT_CONTRACT_ID as string,
          wallet
        );

        setInsuranceContract(insuranceContract);
        setNftContract(nftContract);
      } catch (err) {
        console.error('Error initializing contracts:', err);
        setError('Failed to initialize contracts');
      } finally {
        setIsLoading(false);
      }
    }

    initializeContracts();
  }, [wallet]);

  return {
    insuranceContract,
    nftContract,
    isLoading,
    error,
  };
}
