/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { InsuranceManager } from 'generated';

InsuranceManager.RegisterPolicyEvent.handler(async ({ event, context }) => {
  context.log.info(`ID: ${event.block.id}`);
  context.log.info(`Policy ID: ${event.params.policy_id.bits}`);
  context.log.info(`Timestamp: ${event.params.timestamp.toString()}`);

  context.InsuranceManager_RegisterPolicyEvent.set({
    id: `${event.block.id}-${event.params.timestamp.toString()}`,
    // policyId: event.params.policy_id.bits,
    // owner: event.params.owner.payload.bits,
    // insuredValue: event.params.insured_value.toString(),
    // premium: event.params.premium.toString(),
    // startDate: event.params.start_date.toString(),
    // endDate: event.params.end_date.toString(),
    // policyType: event.params.policy_type.case,
    // status: event.params.status.case,
    // timestamp: String(event.params.timestamp),
  });
});
