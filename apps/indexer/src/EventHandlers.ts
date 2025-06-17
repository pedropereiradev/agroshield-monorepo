/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  InsuranceManager,
  type InsuranceManager_RegisterPolicyEvent,
} from 'generated';

InsuranceManager.RegisterPolicyEvent.handler(async ({ event, context }) => {
  const entity: InsuranceManager_RegisterPolicyEvent = {
    id: `${event.chainId}_${event.block.height}_${event.logIndex}_${event.transaction.id}`,
    policyId: event.params.policy_id.bits,
    owner: event.params.owner.payload.bits,
    insuredValue: event.params.insured_value.toString(),
    premium: event.params.premium.toString(),
    startDate: event.params.start_date.toString(),
    endDate: event.params.end_date.toString(),
    policyType: event.params.policy_type.case,
    status: event.params.status.case,
    timestamp: event.params.timestamp.toString(),
    blockHeight: event.block.height,
    chainId: event.chainId,
  };

  context.InsuranceManager_RegisterPolicyEvent.set(entity);
});
