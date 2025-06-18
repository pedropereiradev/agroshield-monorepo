import { gql } from 'graphql-request';
import { POLICY_EVENT_FRAGMENT } from '../shared/fragments';

export const GET_POLICIES_BY_OWNER = gql`
  ${POLICY_EVENT_FRAGMENT}
  query GetPoliciesByOwner($owner: String!) {
    InsuranceManager_RegisterPolicyEvent(
      where: { owner: { _eq: $owner } }
      order_by: { timestamp: desc }
    ) {
      ...PolicyEventFields
    }
  }
`;

export const GET_POLICY_BY_ID = gql`
  ${POLICY_EVENT_FRAGMENT}
  query GetPolicyById($policyId: String!) {
    InsuranceManager_RegisterPolicyEvent(
      where: { policyId: { _eq: $policyId } }
      limit: 1
    ) {
      ...PolicyEventFields
    }
  }
`;

export const GET_ALL_POLICIES = gql`
  ${POLICY_EVENT_FRAGMENT}
  query GetAllPolicies($limit: Int = 50, $offset: Int = 0) {
    InsuranceManager_RegisterPolicyEvent(
      limit: $limit
      offset: $offset
      order_by: { timestamp: desc }
    ) {
      ...PolicyEventFields
    }
  }
`;

export const GET_POLICIES_BY_STATUS = gql`
  ${POLICY_EVENT_FRAGMENT}
  query GetPoliciesByStatus($status: PolicyStatus!, $limit: Int = 50) {
    InsuranceManager_RegisterPolicyEvent(
      where: { status: { _eq: $status } }
      limit: $limit
      order_by: { timestamp: desc }
    ) {
      ...PolicyEventFields
    }
  }
`;

export const SUBSCRIBE_TO_NEW_POLICIES = gql`
  ${POLICY_EVENT_FRAGMENT}
  subscription SubscribeToNewPolicies($owner: String) {
    InsuranceManager_RegisterPolicyEvent(
      where: { owner: { _eq: $owner } }
      order_by: { timestamp: desc }
      limit: 1
    ) {
      ...PolicyEventFields
    }
  }
`;
