import type { CalculatePremiumPayload } from './types';

/**
 * Calculates the expected loss based on event probability and insured value (LMI).
 * @param probability - Probability of the insured event occurring (0.0 - 1.0).
 * @param insuredValue - Limit of Monetary Indemnity (LMI), i.e., coverage cap in currency units.
 * @returns The expected loss amount.
 */
export function calculateExpectedLoss(
  probability: number,
  insuredValue: number
): number {
  return probability * insuredValue;
}

/**
 * Calculates the full premium to charge for a policy.
 * @param insuredValue   - Limit of Monetary Indemnity (LMI).
 * @param probability     - Probability of event occurrence (0.0 - 1.0).
 * @param riskMargin      - Prudential buffer amount.
 * @param opsCost         - Operational cost loading.
 * @param projectProfit   - Desired project profit loading.
 * @returns Total premium amount.
 */
export function calculatePremium({
  insuredValue,
  probability,
  riskMargin,
  opsCost,
  projectProfit,
}: CalculatePremiumPayload): number {
  const expectedLoss = calculateExpectedLoss(probability, insuredValue);
  return expectedLoss + riskMargin + opsCost + projectProfit;
}
