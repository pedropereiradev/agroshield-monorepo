import type { QuoteRequest, QuoteResponse } from '../schemas/quote.schema';
import { PremiumCalculationService } from './premium-calculation.service';
import { WeatherDataService } from './weather-data.service';

export default class QuoteService {
  private _weatherDataService: WeatherDataService;
  private _premiumCalculationService: PremiumCalculationService;

  constructor() {
    this._weatherDataService = new WeatherDataService();
    this._premiumCalculationService = new PremiumCalculationService();
  }

  async quote(req: QuoteRequest): Promise<QuoteResponse> {
    const {
      crop,
      triggerEvent,
      areaHa,
      coveragePct,
      plantingMonth,
      harvestMonth,
    } = req;

    const LMI = this._premiumCalculationService.calculateLMI(
      areaHa,
      coveragePct
    );

    const weatherDays = await this._weatherDataService.getWeatherData(req);

    const { p, lower, upper } =
      this._premiumCalculationService.calculateRiskProbability(
        triggerEvent,
        weatherDays,
        crop,
        plantingMonth,
        harvestMonth
      );

    const premium = this._premiumCalculationService.calculatePremiumAmount(
      LMI,
      p
    );

    return {
      probability: p,
      lower,
      upper,
      LMI,
      premium,
    };
  }
}
