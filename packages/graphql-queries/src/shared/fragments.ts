import { gql } from 'graphql-request';

export const POLICY_FRAGMENT = gql`
  fragment PolicyFields on Policies {
    id
    policyId
    owner
    insuredValue
    premium
    policyType
    status
    timestamp
  }
`;

export const CLAIM_FRAGMENT = gql`
  fragment ClaimFields on Claims {
    id
    timestamp
    oldStatus
    newStatus
    policy {
      id
      policyId
    }
  }
`;

export const POLICY_WITH_CLAIMS_FRAGMENT = gql`
  fragment PolicyWithClaimsFields on Policies {
    id
    policyId
    owner
    insuredValue
    premium
    policyType
    status
    timestamp
    claims {
      id
      timestamp
      oldStatus
      newStatus
    }
  }
`;
