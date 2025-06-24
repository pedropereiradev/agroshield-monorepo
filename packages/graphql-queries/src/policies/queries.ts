import { gql } from 'graphql-request';
import {
  POLICY_FRAGMENT,
  POLICY_WITH_CLAIMS_FRAGMENT,
} from '../shared/fragments';

export const GET_POLICIES_BY_OWNER = gql`
  ${POLICY_FRAGMENT}
  query GetPoliciesByOwner($owner: String!) {
    Policies(
      where: { owner: { _eq: $owner } }
      order_by: { timestamp: desc }
    ) {
      ...PolicyFields
    }
  }
`;

export const GET_POLICY_BY_ID = gql`
  ${POLICY_WITH_CLAIMS_FRAGMENT}
  query GetPolicyById($policyId: String!) {
    Policies(
      where: { policyId: { _eq: $policyId } }
      limit: 1
    ) {
      ...PolicyWithClaimsFields
    }
  }
`;

export const GET_POLICY_BY_POLICY_ID = gql`
  ${POLICY_FRAGMENT}
  query GetPolicyByPolicyId($policyId: String!) {
    Policies(
      where: { policyId: { _eq: $policyId } }
      limit: 1
    ) {
      ...PolicyFields
    }
  }
`;

export const GET_ALL_POLICIES = gql`
  ${POLICY_FRAGMENT}
  query GetAllPolicies($limit: Int = 50, $offset: Int = 0) {
    Policies(
      limit: $limit
      offset: $offset
      order_by: { timestamp: desc }
    ) {
      ...PolicyFields
    }
  }
`;

export const GET_POLICIES_BY_STATUS = gql`
  ${POLICY_FRAGMENT}
  query GetPoliciesByStatus($status: String!, $limit: Int = 50) {
    Policies(
      where: { status: { _eq: $status } }
      limit: $limit
      order_by: { timestamp: desc }
    ) {
      ...PolicyFields
    }
  }
`;

export const SUBSCRIBE_TO_NEW_POLICIES = gql`
  ${POLICY_FRAGMENT}
  subscription SubscribeToNewPolicies($owner: String) {
    Policies(
      where: { owner: { _eq: $owner } }
      order_by: { timestamp: desc }
      limit: 1
    ) {
      ...PolicyFields
    }
  }
`;
