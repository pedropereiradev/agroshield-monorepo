export interface CalculatePremiumPayload {
  insuredValue: number;
  probability: number;
  riskMargin: number;
  opsCost: number;
  projectProfit: number;
}
