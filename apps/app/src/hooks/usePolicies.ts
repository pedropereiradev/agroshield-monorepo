import { useWallet } from '@fuels/react';
// hooks/usePolicies.ts
import { useEffect, useState } from 'react';
import { useInsuranceContracts } from './useInsuranceContracts';

export interface Policy {
  id: string;
  cropType: string;
  policyType: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Claimed';
  coverageAmount: number;
  premiumPaid: number;
  startDate: string;
  endDate: string;
  progressPercentage: number;
}

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    insuranceContract,
    nftContract,
    isLoading: contractsLoading,
  } = useInsuranceContracts();
  const { wallet } = useWallet();

  const fetchPolicies = async () => {
    if (!insuranceContract || !wallet) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Call your contract to get policies
      const result = await insuranceContract.functions
        .get_policies_by_owner(wallet.address.toAddress())
        .simulate();

      // Transform contract data into Policy objects
      // This will depend on your contract's return structure
      const policiesData = result.map((item) => ({
        // Map contract fields to your Policy interface
      }));

      setPolicies(policiesData);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError('Failed to fetch policies');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch policies when contract is ready
  useEffect(() => {
    if (!contractsLoading && insuranceContract && wallet) {
      fetchPolicies();
    }
  }, [contractsLoading, insuranceContract, wallet]);

  return {
    policies,
    isLoading: isLoading || contractsLoading,
    error,
    refetch: fetchPolicies,
  };
}
