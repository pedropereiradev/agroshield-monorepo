import { getApiServerConfig } from '@agroshield/config';
import {
  LMI_PER_HECTARE,
  type WeatherDay,
  calculatePremium,
  generateCustomSeasons,
  probability,
} from '@agroshield/core-domain';
import type { QuoteRequest } from '../schemas/quote.schema';

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
    triggerEvent: QuoteRequest['triggerEvent'],
    weatherDays: WeatherDay[],
    crop: QuoteRequest['crop'],
    plantingMonth: number,
    harvestMonth: number
  ): { p: number; lower: number; upper: number } {
    const seasons = generateCustomSeasons({
      crop,
      yearsBack: 30,
      plantingMonth,
      harvestMonth,
    });

    return probability(triggerEvent, weatherDays, seasons);
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
