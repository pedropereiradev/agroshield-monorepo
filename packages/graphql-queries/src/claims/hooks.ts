import { graphQLClient } from '@agroshield/graphql-client';
import type { Claims } from '@agroshield/graphql-types';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  GET_ALL_CLAIMS,
  GET_CLAIMS_BY_POLICY,
  GET_CLAIMS_BY_POLICY_ID,
  GET_CLAIMS_BY_POLICY_OWNER,
  GET_CLAIMS_BY_STATUS,
  GET_RECENT_CLAIMS,
} from './queries';

interface GetClaimsByPolicyVariables {
  policyId: string;
}

interface GetClaimsByPolicyOwnerVariables {
  owner: string;
}

interface GetClaimsByPolicyIdVariables {
  policyDbId: string;
}

interface GetAllClaimsVariables {
  limit?: number;
  offset?: number;
}

interface GetClaimsByStatusVariables {
  status: string;
  limit?: number;
}

interface GetRecentClaimsVariables {
  limit?: number;
}

interface GetClaimsByPolicyResponse {
  Claims: Claims[];
}

interface GetClaimsByPolicyOwnerResponse {
  Claims: Claims[];
}

interface GetClaimsByPolicyIdResponse {
  Claims: Claims[];
}

interface GetAllClaimsResponse {
  Claims: Claims[];
}

interface GetClaimsByStatusResponse {
  Claims: Claims[];
}

interface GetRecentClaimsResponse {
  Claims: Claims[];
}

export function useClaimsByPolicy(
  policyId: string | undefined
): UseQueryResult<Claims[], Error> {
  return useQuery({
    queryKey: ['claims', 'by-policy', policyId],
    queryFn: async () => {
      if (!policyId) throw new Error('Policy ID is required');

      const response = await graphQLClient.request<GetClaimsByPolicyResponse>(
        GET_CLAIMS_BY_POLICY,
        { policyId } as GetClaimsByPolicyVariables
      );

      return response.Claims;
    },
    enabled: !!policyId,
  });
}

export function useClaimsByPolicyOwner(
  owner: string | undefined
): UseQueryResult<Claims[], Error> {
  return useQuery({
    queryKey: ['claims', 'by-policy-owner', owner],
    queryFn: async () => {
      if (!owner) throw new Error('Owner address is required');

      const response =
        await graphQLClient.request<GetClaimsByPolicyOwnerResponse>(
          GET_CLAIMS_BY_POLICY_OWNER,
          { owner } as GetClaimsByPolicyOwnerVariables
        );

      return response.Claims;
    },
    enabled: !!owner,
  });
}

export function useClaimsByPolicyId(
  policyDbId: string | undefined
): UseQueryResult<Claims[], Error> {
  return useQuery({
    queryKey: ['claims', 'by-policy-id', policyDbId],
    queryFn: async () => {
      if (!policyDbId) throw new Error('Policy database ID is required');

      const response = await graphQLClient.request<GetClaimsByPolicyIdResponse>(
        GET_CLAIMS_BY_POLICY_ID,
        { policyDbId } as GetClaimsByPolicyIdVariables
      );

      return response.Claims;
    },
    enabled: !!policyDbId,
  });
}

export function useAllClaims(
  variables: GetAllClaimsVariables = {}
): UseQueryResult<Claims[], Error> {
  const { limit = 50, offset = 0 } = variables;

  return useQuery({
    queryKey: ['claims', 'all', limit, offset],
    queryFn: async () => {
      const response = await graphQLClient.request<GetAllClaimsResponse>(
        GET_ALL_CLAIMS,
        { limit, offset } as GetAllClaimsVariables
      );

      return response.Claims;
    },
  });
}

export function useClaimsByStatus(
  status: string,
  limit = 50
): UseQueryResult<Claims[], Error> {
  return useQuery({
    queryKey: ['claims', 'by-status', status, limit],
    queryFn: async () => {
      const response = await graphQLClient.request<GetClaimsByStatusResponse>(
        GET_CLAIMS_BY_STATUS,
        { status, limit } as GetClaimsByStatusVariables
      );

      return response.Claims;
    },
  });
}

export function useRecentClaims(limit = 10): UseQueryResult<Claims[], Error> {
  return useQuery({
    queryKey: ['claims', 'recent', limit],
    queryFn: async () => {
      const response = await graphQLClient.request<GetRecentClaimsResponse>(
        GET_RECENT_CLAIMS,
        { limit } as GetRecentClaimsVariables
      );

      return response.Claims;
    },
  });
}
