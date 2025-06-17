/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  InsuranceManager,
  type InsuranceManager_RegisterPolicyEvent,
} from 'generated';

// Helper function to convert Fuel Identity to string
function identityToString(identity: any): string {
  if (identity.Address) {
    return identity.Address.bits;
  } else if (identity.ContractId) {
    return identity.ContractId.bits;
  }
  return '';
}

// Helper function to convert policy type enum to string
function policyTypeToString(policyType: any): string {
  if (policyType.Rainfall !== undefined) return 'Rainfall';
  if (policyType.Temperature !== undefined) return 'Temperature';
  if (policyType.Drought !== undefined) return 'Drought';
  return 'Rainfall'; // Default fallback
}

// Helper function to convert status enum to string
function statusToString(status: any): string {
  if (status.Active !== undefined) return 'Active';
  if (status.Inactive !== undefined) return 'Inactive';
  if (status.Claimed !== undefined) return 'Claimed';
  if (status.Expired !== undefined) return 'Expired';
  if (status.Pending !== undefined) return 'Pending';
  if (status.Approved !== undefined) return 'Approved';
  if (status.Rejected !== undefined) return 'Rejected';
  if (status.Suspended !== undefined) return 'Suspended';
  if (status.UnderReview !== undefined) return 'UnderReview';
  return 'Pending'; // Default fallback
}

InsuranceManager.RegisterPolicyEvent.handler(async ({ event, context }) => {
  const entity: InsuranceManager_RegisterPolicyEvent = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    policyId: event.policy_id.bits,
    owner: identityToString(event.owner),
    insuredValue: event.insured_value.toString(),
    premium: event.premium.toString(),
    startDate: event.start_date.toString(),
    endDate: event.end_date.toString(),
    policyType: policyTypeToString(event.policy_type),
    status: statusToString(event.status),
    timestamp: event.timestamp.toString(),
    blockHeight: event.block.height,
    chainId: event.chainId,
  };

  context.InsuranceManager_RegisterPolicyEvent.set(entity);
});
