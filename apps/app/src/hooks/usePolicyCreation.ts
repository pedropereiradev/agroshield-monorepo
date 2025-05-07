import { useState } from 'react';
import { useInsuranceContracts } from './useInsuranceContracts';

export interface PolicyDetails {
  crop: string;
  season: string;
  startDate: string;
  durationDays: number;
  regionX: number;
  regionY: number;
  insuredValue: number;
  premium: number;
  policyType: string;
  expirationDate: string;
  insuredArea: number;
  insuredAreaUnit: string;
}

export function usePolicyCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    insuranceContract,
    nftContract,
    isLoading,
    error: contractError,
  } = useInsuranceContracts();

  const createPolicy = async (policyDetails: PolicyDetails) => {
    if (!insuranceContract || !nftContract) {
      setError('Contracts not initialized');
      return null;
    }

    try {
      setIsCreating(true);
      setError(null);

      const { waitForResult } = await insuranceContract.functions
        .create_insurance(
          policyDetails.crop,
          policyDetails.season,
          policyDetails.startDate,
          policyDetails.durationDays,
          policyDetails.regionX,
          policyDetails.regionY,
          policyDetails.insuredValue,
          policyDetails.premium,
          policyDetails.policyType,
          policyDetails.expirationDate,
          policyDetails.insuredArea,
          policyDetails.insuredAreaUnit
        )
        .addContracts([nftContract])
        .call();

      const result = await waitForResult();
      setTransactionId(result.transactionId);

      return result;
    } catch (err: any) {
      console.error('Error creating policy:', err);
      setError(err.message || 'Failed to create policy');
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createPolicy,
    isCreating,
    transactionId,
    error: error || contractError,
    isLoading,
    isReady: !isLoading && !!insuranceContract && !!nftContract,
  };
}
