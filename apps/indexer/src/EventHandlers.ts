/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { InsuranceManager } from 'generated';

InsuranceManager.RegisterPolicyEvent.handler(async ({ event, context }) => {
  // const entity: InsuranceManager_RegisterPolicyEvent = {
  //   id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
  //   // policyId: event.params.policy_id.bits,
  //   // owner: event.params.owner.payload.bits,
  //   // insuredValue: event.params.insured_value.toString(),
  //   // premium: event.params.premium.toString(),
  //   // startDate: event.params.start_date.toString(),
  //   // endDate: event.params.end_date.toString(),
  //   // policyType: event.params.policy_type.case,
  //   // status: event.params.status.case,
  //   // timestamp: String(event.params.timestamp),
  // };

  context.InsuranceManager_RegisterPolicyEvent.set({
    id: `${event.block.id}-${event.params.policy_id.bits}`,
  });
});
