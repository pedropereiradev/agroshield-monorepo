import { graphQLClient } from '@agroshield/graphql-client';
import type {
  InsuranceManagerRegisterPolicyEvent,
  PolicyStatus,
} from '@agroshield/graphql-types';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  GET_ALL_POLICIES,
  GET_POLICIES_BY_OWNER,
  GET_POLICIES_BY_STATUS,
  GET_POLICY_BY_ID,
} from './queries';

interface GetPoliciesByOwnerVariables {
  owner: string;
}

interface GetPolicyByIdVariables {
  policyId: string;
}

interface GetAllPoliciesVariables {
  limit?: number;
  offset?: number;
}

interface GetPoliciesByStatusVariables {
  status: PolicyStatus;
  limit?: number;
}

interface GetPoliciesByOwnerResponse {
  InsuranceManager_RegisterPolicyEvent: InsuranceManagerRegisterPolicyEvent[];
}

interface GetPolicyByIdResponse {
  InsuranceManager_RegisterPolicyEvent: InsuranceManagerRegisterPolicyEvent[];
}

interface GetAllPoliciesResponse {
  InsuranceManager_RegisterPolicyEvent: InsuranceManagerRegisterPolicyEvent[];
}

interface GetPoliciesByStatusResponse {
  InsuranceManager_RegisterPolicyEvent: InsuranceManagerRegisterPolicyEvent[];
}

export function usePoliciesByOwner(
  owner: string | undefined
): UseQueryResult<InsuranceManagerRegisterPolicyEvent[], Error> {
  return useQuery({
    queryKey: ['policies', 'by-owner', owner],
    queryFn: async () => {
      if (!owner) throw new Error('Owner address is required');

      const response = await graphQLClient.request<GetPoliciesByOwnerResponse>(
        GET_POLICIES_BY_OWNER,
        { owner } as GetPoliciesByOwnerVariables
      );

      return response.InsuranceManager_RegisterPolicyEvent;
    },
    enabled: !!owner,
  });
}

export function usePolicyById(
  policyId: string | undefined
): UseQueryResult<InsuranceManagerRegisterPolicyEvent | null, Error> {
  return useQuery({
    queryKey: ['policies', 'by-id', policyId],
    queryFn: async () => {
      if (!policyId) throw new Error('Policy ID is required');

      const response = await graphQLClient.request<GetPolicyByIdResponse>(
        GET_POLICY_BY_ID,
        { policyId } as GetPolicyByIdVariables
      );

      return response.InsuranceManager_RegisterPolicyEvent[0] || null;
    },
    enabled: !!policyId,
  });
}

export function useAllPolicies(
  variables: GetAllPoliciesVariables = {}
): UseQueryResult<InsuranceManagerRegisterPolicyEvent[], Error> {
  const { limit = 50, offset = 0 } = variables;

  return useQuery({
    queryKey: ['policies', 'all', limit, offset],
    queryFn: async () => {
      const response = await graphQLClient.request<GetAllPoliciesResponse>(
        GET_ALL_POLICIES,
        { limit, offset } as GetAllPoliciesVariables
      );

      return response.InsuranceManager_RegisterPolicyEvent;
    },
  });
}

export function usePoliciesByStatus(
  status: PolicyStatus,
  limit = 50
): UseQueryResult<InsuranceManagerRegisterPolicyEvent[], Error> {
  return useQuery({
    queryKey: ['policies', 'by-status', status, limit],
    queryFn: async () => {
      const response = await graphQLClient.request<GetPoliciesByStatusResponse>(
        GET_POLICIES_BY_STATUS,
        { status, limit } as GetPoliciesByStatusVariables
      );

      return response.InsuranceManager_RegisterPolicyEvent;
    },
  });
}
