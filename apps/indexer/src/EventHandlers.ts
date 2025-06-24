/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { InsuranceManager } from 'generated';

InsuranceManager.RegisterPolicyEvent.handler(async ({ event, context }) => {
  context.Policies.set({
    id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
    policyId: event.params.policy_id.bits,
    owner: event.params.owner.payload.bits,
    insuredValue: event.params.insured_value.toString(),
    premium: event.params.premium.toString(),
    startDate: event.params.start_date.toString(),
    endDate: event.params.end_date.toString(),
    policyType: event.params.policy_type.case,
    status: event.params.status.case,
    timestamp: String(event.params.timestamp),
  });
});

InsuranceManager.RequestClaimEvent.handler(async ({ event, context }) => {
  const policy = await context.Policies.get(
    `${event.chainId}_${event.block.height}_${event.logIndex}`
  );

  if (policy) {
    context.Policies.set({
      ...policy,
      status: event.params.new_status.case,
    });

    context.Claims.set({
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
      policy_id: policy.id,
      timestamp: event.params.timestamp.toString(),
      oldStatus: event.params.old_status.case,
      newStatus: event.params.new_status.case,
    });
  }
});

InsuranceManager.ApproveClaimEvent.handler(async ({ event, context }) => {
  const policy = await context.Policies.get(
    `${event.chainId}_${event.block.height}_${event.logIndex}`
  );

  if (policy) {
    context.Policies.set({
      ...policy,
      status: event.params.new_status.case,
    });

    context.Claims.set({
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
      policy_id: policy.id,
      timestamp: event.params.timestamp.toString(),
      oldStatus: event.params.old_status.case,
      newStatus: event.params.new_status.case,
    });
  }
});

InsuranceManager.RejectClaimEvent.handler(async ({ event, context }) => {
  const policy = await context.Policies.get(
    `${event.chainId}_${event.block.height}_${event.logIndex}`
  );

  if (policy) {
    context.Policies.set({
      ...policy,
      status: event.params.new_status.case,
    });

    context.Claims.set({
      id: `${event.chainId}_${event.block.height}_${event.logIndex}`,
      policy_id: policy.id,
      timestamp: event.params.timestamp.toString(),
      oldStatus: event.params.old_status.case,
      newStatus: event.params.new_status.case,
    });
  }
});

InsuranceManager.ExpirePolicyEvent.handler(async ({ event, context }) => {
  const policy = await context.Policies.get(
    `${event.chainId}_${event.block.height}_${event.logIndex}`
  );

  if (policy) {
    context.Policies.set({
      ...policy,
      status: event.params.new_status.case,
    });
  }
});
