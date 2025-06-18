import { gql } from 'graphql-request';

export const POLICY_EVENT_FRAGMENT = gql`
  fragment PolicyEventFields on InsuranceManager_RegisterPolicyEvent {
    id
    policyId
    owner
    insuredValue
    premium
    startDate
    endDate
    policyType
    status
    timestamp
  }
`;
