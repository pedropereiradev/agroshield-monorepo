import { useState } from 'react';
import { useInsuranceContracts } from './useInsuranceContracts';

export function useRequestClaim() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    insuranceContract,
    managerContract,
    isLoading,
    error: contractError,
  } = useInsuranceContracts();

  const requestClaim = async (policyId: string) => {
    if (!insuranceContract || !managerContract) {
      setError('Insurance contract or manager contract not initialized');
      return null;
    }

    try {
      setIsRequesting(true);
      setError(null);

      const { waitForResult } = await insuranceContract.functions
        .request_claim({ bits: policyId })
        .addContracts([managerContract])
        .call();

      const result = await waitForResult();
      setTransactionId(result.transactionId);

      return result;
    } catch (error) {
      console.error('Error requesting claim:', error);
      setError((error as Error).message || 'Failed to request claim');
      return null;
    } finally {
      setIsRequesting(false);
    }
  };

  return {
    requestClaim,
    isRequesting,
    transactionId,
    error: error || contractError,
    isLoading,
  };
}
