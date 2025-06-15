import type { PolicyTypeInput } from '@/sway-contracts-api/contracts/InsuranceContract';
import { useState } from 'react';
import { useInsuranceContracts } from './useInsuranceContracts';

export interface PolicyDetails {
  crop: string;
  startDate: number;
  endDate: number;
  regionX: number;
  regionY: number;
  insuredValue: number;
  premium: number;
  policyType: PolicyTypeInput;
  insuredArea: number;
  insuredAreaUnit: string;
  plantingMonth: number;
  harvestMonth: number;
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
          policyDetails.startDate,
          policyDetails.endDate,
          policyDetails.regionX * -1,
          policyDetails.regionY * -1,
          policyDetails.insuredValue,
          policyDetails.premium,
          policyDetails.policyType,
          policyDetails.insuredArea,
          policyDetails.insuredAreaUnit,
          policyDetails.plantingMonth,
          policyDetails.harvestMonth
        )
        .addContracts([nftContract])
        .call();

      const result = await waitForResult();
      setTransactionId(result.transactionId);

      return result;
    } catch (err: unknown) {
      console.error('Error creating policy:', err);
      setError((err as Error).message || 'Failed to create policy');
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
