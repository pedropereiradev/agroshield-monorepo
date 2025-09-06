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

    // Calculate LMI (Loss Maximum Indemnity)
    const LMI = this._premiumCalculationService.calculateLMI(
      areaHa,
      coveragePct
    );

    // Get weather data for the location and time period
    const weatherDays = await this._weatherDataService.getWeatherData(req);

    // Calculate risk probability
    const { p, lower, upper } =
      this._premiumCalculationService.calculateRiskProbability(
        triggerEvent,
        weatherDays,
        crop,
        plantingMonth,
        harvestMonth
      );

    // Calculate premium based on risk
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
