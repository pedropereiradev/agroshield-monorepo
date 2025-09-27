import type { Job, QuoteJobData } from '@agroshield/queue';
import { PremiumCalculationService } from './premium-calculation.service';
import { WeatherDataService } from './weather-data.service';

export class QuoteProcessor {
  private _weatherDataService: WeatherDataService;
  private _premiumCalculationService: PremiumCalculationService;

  constructor() {
    this._weatherDataService = new WeatherDataService();
    this._premiumCalculationService = new PremiumCalculationService();
  }

  async processQuote(data: QuoteJobData, job: Job<QuoteJobData>) {
    const { requestData } = data;

    await job.updateProgress(20);
    await job.log('Starting weather data collection...');

    // The request data already matches the expected format
    const quoteRequest = {
      ...requestData,
      location: {
        latitude: requestData.latitude,
        longitude: requestData.longitude,
      },
    };

    await job.updateProgress(30);

    const LMI = this._premiumCalculationService.calculateLMI(
      quoteRequest.areaHa,
      quoteRequest.coveragePct
    );

    await job.updateProgress(50);
    await job.log('Collecting weather data...');

    const weatherDays =
      await this._weatherDataService.getWeatherData(quoteRequest);

    await job.updateProgress(70);
    await job.log('Calculating risk probability...');

    const { p, lower, upper } =
      this._premiumCalculationService.calculateRiskProbability(
        quoteRequest.triggerEvent,
        weatherDays,
        quoteRequest.crop,
        quoteRequest.plantingMonth,
        quoteRequest.harvestMonth
      );

    await job.updateProgress(90);
    await job.log('Calculating premium amount...');

    const premium = this._premiumCalculationService.calculatePremiumAmount(
      LMI,
      p
    );

    const result = {
      quoteId: data.quoteId,
      probability: p,
      lower,
      upper,
      LMI,
      premium,
      processedAt: new Date().toISOString(),
    };

    await job.log('Quote processing completed successfully');

    return result;
  }
}
