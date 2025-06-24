import { gql } from 'graphql-request';
import { CLAIM_FRAGMENT } from '../shared/fragments';

export const GET_CLAIMS_BY_POLICY = gql`
  ${CLAIM_FRAGMENT}
  query GetClaimsByPolicy($policyId: String!) {
    Claims(
      where: { policy: { policyId: { _eq: $policyId } } }
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const GET_CLAIMS_BY_POLICY_OWNER = gql`
  ${CLAIM_FRAGMENT}
  query GetClaimsByPolicyOwner($owner: String!) {
    Claims(
      where: { policy: { owner: { _eq: $owner } } }
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const GET_CLAIMS_BY_POLICY_ID = gql`
  ${CLAIM_FRAGMENT}
  query GetClaimsByPolicyId($policyDbId: ID!) {
    Claims(
      where: { policy: { id: { _eq: $policyDbId } } }
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const GET_ALL_CLAIMS = gql`
  ${CLAIM_FRAGMENT}
  query GetAllClaims($limit: Int = 50, $offset: Int = 0) {
    Claims(
      limit: $limit
      offset: $offset
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const GET_CLAIMS_BY_STATUS = gql`
  ${CLAIM_FRAGMENT}
  query GetClaimsByStatus($status: String!, $limit: Int = 50) {
    Claims(
      where: { newStatus: { _eq: $status } }
      limit: $limit
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const GET_RECENT_CLAIMS = gql`
  ${CLAIM_FRAGMENT}
  query GetRecentClaims($limit: Int = 10) {
    Claims(
      limit: $limit
      order_by: { timestamp: desc }
    ) {
      ...ClaimFields
    }
  }
`;

export const SUBSCRIBE_TO_NEW_CLAIMS = gql`
  ${CLAIM_FRAGMENT}
  subscription SubscribeToNewClaims($policyId: String) {
    Claims(
      where: { policy: { policyId: { _eq: $policyId } } }
      order_by: { timestamp: desc }
      limit: 1
    ) {
      ...ClaimFields
    }
  }
`;
