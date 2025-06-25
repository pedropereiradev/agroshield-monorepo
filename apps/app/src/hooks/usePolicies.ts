import { usePoliciesByOwner } from '@agroshield/graphql-queries';
import type {
  InsuranceManagerRegisterPolicyEvent,
  PolicyStatus,
  PolicyType,
} from '@agroshield/graphql-types';
import { useWallet } from '@fuels/react';
import { DateTime } from 'fuels';
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

  const calculateProgressPercentage = (startTimestamp: string): number => {
    const now = Date.now() / 1000;
    const startDate = DateTime.fromTai64(startTimestamp).toUnixSeconds();
    const endDate = startDate + 31536000; // 1 year later
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
        startDate: DateTime.fromTai64(policy.timestamp).toISOString(),
        endDate: DateTime.fromUnixSeconds(
          DateTime.fromTai64(policy.timestamp).toUnixSeconds() + 31536000
        ).toISOString(),
        progressPercentage: calculateProgressPercentage(policy.timestamp),
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
