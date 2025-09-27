import { getApiServerConfig } from '@agroshield/config';
import {
  LMI_PER_HECTARE,
  type WeatherDay,
  calculatePremium,
  generateCustomSeasons,
  probability,
} from '@agroshield/core-domain';

export class PremiumCalculationService {
  private readonly riskMargin: number;
  private readonly opsCost: number;
  private readonly projectProfit: number;

  constructor() {
    const config = getApiServerConfig();

    this.riskMargin = config.riskMargin;
    this.opsCost = config.opsCost;
    this.projectProfit = config.projectProfit;
  }

  calculateLMI(areaHa: number, coveragePct: number): number {
    return areaHa * LMI_PER_HECTARE * coveragePct;
  }

  calculateRiskProbability(
    triggerEvent: string,
    weatherDays: WeatherDay[],
    crop: 'soy' | 'rice',
    plantingMonth: number,
    harvestMonth: number
  ): { p: number; lower: number; upper: number } {
    const seasons = generateCustomSeasons({
      crop,
      yearsBack: 30,
      plantingMonth,
      harvestMonth,
    });

    return probability(triggerEvent as any, weatherDays, seasons);
  }

  calculatePremiumAmount(
    insuredValue: number,
    probabilityValue: number
  ): number {
    return calculatePremium({
      insuredValue,
      probability: probabilityValue,
      riskMargin: this.riskMargin,
      opsCost: this.opsCost,
      projectProfit: this.projectProfit,
    });
  }
}
