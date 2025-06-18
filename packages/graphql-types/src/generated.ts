export type PolicyType = 'Rainfall' | 'Temperature' | 'Drought';

export type PolicyStatus =
  | 'Active'
  | 'Inactive'
  | 'Claimed'
  | 'Expired'
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Suspended'
  | 'UnderReview';

export interface InsuranceManagerRegisterPolicyEvent {
  id: string;
  policyId: string;
  owner: string;
  insuredValue: string;
  premium: string;
  startDate: string;
  endDate: string;
  policyType: PolicyType;
  status: PolicyStatus;
  timestamp: string;
}
