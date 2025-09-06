import type { PolicyTypeInput } from '@agroshield/contracts';
import type { Account } from 'fuels';
import { useState } from 'react';
import { useInsuranceContracts } from './useInsuranceContracts';

export interface PolicyDetails {
  crop: string;
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

export function usePolicyCreation(wallet: Account | null) {
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

    if (!wallet) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setIsCreating(true);
      setError(null);

      // const amount = await checkAccountBalance(
      //   this.account,
      //   domainName,
      //   period
      // );
      const accountBalance = await wallet.getBalance();
      const assetId = await wallet.provider.getBaseAssetId();

      if (accountBalance.lt(policyDetails.premium)) {
        setError('Insufficient balance');
        return null;
      }

      const { waitForResult } = await insuranceContract.functions
        .create_insurance(
          policyDetails.crop,
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
        .callParams({
          forward: { amount: policyDetails.premium, assetId },
        })
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
