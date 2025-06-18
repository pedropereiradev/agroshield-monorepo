import { usePoliciesByOwner } from '@agroshield/graphql-queries';
import type {
  InsuranceManagerRegisterPolicyEvent,
  PolicyStatus,
  PolicyType,
} from '@agroshield/graphql-types';
import { useWallet } from '@fuels/react';
import { useMemo } from 'react';

export interface Policy {
  id: string;
  policyId: string;
  cropType: string;
  policyType: PolicyType;
  status: PolicyStatus;
  coverageAmount: number;
  premiumPaid: number;
  startDate: string;
  endDate: string;
  progressPercentage: number;
  timestamp: string;
}

export function usePolicies() {
  const { wallet } = useWallet();
  const ownerAddress = wallet?.address.toB256();

  const {
    data: rawPolicies,
    isLoading,
    error: queryError,
    refetch,
  } = usePoliciesByOwner(ownerAddress);

  const calculateProgressPercentage = (
    startDate: number,
    endDate: number
  ): number => {
    const now = Date.now() / 1000;
    const total = endDate - startDate;
    const elapsed = now - startDate;

    if (now < startDate) return 0;
    if (now > endDate) return 100;

    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const policies = useMemo(() => {
    if (!rawPolicies) return [];

    return rawPolicies.map(
      (policy: InsuranceManagerRegisterPolicyEvent): Policy => ({
        id: policy.policyId,
        policyId: policy.policyId,
        cropType: 'N/A', // TODO: Crop type should be stored in contract or derived from policy metadata
        policyType: policy.policyType,
        status: policy.status,
        coverageAmount: Number(policy.insuredValue),
        premiumPaid: Number(policy.premium),
        startDate: new Date(Number(policy.startDate) * 1000).toISOString(),
        endDate: new Date(Number(policy.endDate) * 1000).toISOString(),
        progressPercentage: calculateProgressPercentage(
          Number(policy.startDate),
          Number(policy.endDate)
        ),
        timestamp: policy.timestamp,
      })
    );
  }, [rawPolicies]);

  return {
    policies,
    isLoading,
    error: queryError?.message || null,
    refetch,
  };
}
