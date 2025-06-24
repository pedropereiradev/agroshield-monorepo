import { graphQLClient } from '@agroshield/graphql-client';
import type { Policies } from '@agroshield/graphql-types';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  GET_ALL_POLICIES,
  GET_POLICIES_BY_OWNER,
  GET_POLICIES_BY_STATUS,
  GET_POLICY_BY_ID,
  GET_POLICY_BY_POLICY_ID,
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
  status: string;
  limit?: number;
}

interface GetPoliciesByOwnerResponse {
  Policies: Policies[];
}

interface GetPolicyByIdResponse {
  Policies: Policies[];
}

interface GetPolicyByPolicyIdResponse {
  Policies: Policies[];
}

interface GetAllPoliciesResponse {
  Policies: Policies[];
}

interface GetPoliciesByStatusResponse {
  Policies: Policies[];
}

export function usePoliciesByOwner(
  owner: string | undefined
): UseQueryResult<Policies[], Error> {
  return useQuery({
    queryKey: ['policies', 'by-owner', owner],
    queryFn: async () => {
      if (!owner) throw new Error('Owner address is required');

      const response = await graphQLClient.request<GetPoliciesByOwnerResponse>(
        GET_POLICIES_BY_OWNER,
        { owner } as GetPoliciesByOwnerVariables
      );

      return response.Policies;
    },
    enabled: !!owner,
  });
}

export function usePolicyById(
  policyId: string | undefined
): UseQueryResult<Policies | null, Error> {
  return useQuery({
    queryKey: ['policies', 'by-id', policyId],
    queryFn: async () => {
      if (!policyId) throw new Error('Policy ID is required');

      const response = await graphQLClient.request<GetPolicyByIdResponse>(
        GET_POLICY_BY_ID,
        { policyId } as GetPolicyByIdVariables
      );

      return response.Policies[0] || null;
    },
    enabled: !!policyId,
  });
}

export function usePolicyByPolicyId(
  policyId: string | undefined
): UseQueryResult<Policies | null, Error> {
  return useQuery({
    queryKey: ['policies', 'by-policy-id', policyId],
    queryFn: async () => {
      if (!policyId) throw new Error('Policy ID is required');

      const response = await graphQLClient.request<GetPolicyByPolicyIdResponse>(
        GET_POLICY_BY_POLICY_ID,
        { policyId } as GetPolicyByIdVariables
      );

      return response.Policies[0] || null;
    },
    enabled: !!policyId,
  });
}

export function useAllPolicies(
  variables: GetAllPoliciesVariables = {}
): UseQueryResult<Policies[], Error> {
  const { limit = 50, offset = 0 } = variables;

  return useQuery({
    queryKey: ['policies', 'all', limit, offset],
    queryFn: async () => {
      const response = await graphQLClient.request<GetAllPoliciesResponse>(
        GET_ALL_POLICIES,
        { limit, offset } as GetAllPoliciesVariables
      );

      return response.Policies;
    },
  });
}

export function usePoliciesByStatus(
  status: string,
  limit = 50
): UseQueryResult<Policies[], Error> {
  return useQuery({
    queryKey: ['policies', 'by-status', status, limit],
    queryFn: async () => {
      const response = await graphQLClient.request<GetPoliciesByStatusResponse>(
        GET_POLICIES_BY_STATUS,
        { status, limit } as GetPoliciesByStatusVariables
      );

      return response.Policies;
    },
  });
}
