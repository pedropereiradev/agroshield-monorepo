import {
  LMI_PER_HECTARE,
  type WeatherDay,
  calculatePremium,
  generateCustomSeasons,
  probability,
} from '@agroshield/core-domain';
import {
  LocationRepo,
  OpenMeteoHistoricalClient,
  WeatherRepo,
} from '@agroshield/data-access';
import type { QuoteRequest, QuoteResponse } from '../schemas/quote.schema';

const { RISK_MARGIN, OPS_COST, PROJECT_PROFIT } = process.env;

export default class QuoteService {
  private _locationRepo: LocationRepo;
  private _weatherRepo: WeatherRepo;
  private _openMeteoHistoricalClient: OpenMeteoHistoricalClient;

  constructor() {
    if (!RISK_MARGIN || !OPS_COST || !PROJECT_PROFIT) {
      throw new Error('Missing environment variables for premium calculation');
    }
    this._locationRepo = new LocationRepo();
    this._weatherRepo = new WeatherRepo();

    this._openMeteoHistoricalClient = new OpenMeteoHistoricalClient();
  }

  async quote(req: QuoteRequest): Promise<QuoteResponse> {
    const {
      crop,
      triggerEvent,
      areaHa,
      coveragePct,
      plantingMonth,
      harvestMonth,
      latitude,
      longitude,
    } = req;

    const LMI = areaHa * LMI_PER_HECTARE * coveragePct;

    const seasons = generateCustomSeasons({
      crop,
      yearsBack: 30,
      plantingMonth,
      harvestMonth,
    });

    if (seasons.length === 0) {
      throw new Error('No seasons generated for this crop');
    }

    const location = await this._locationRepo.findOrCreateLocation(
      latitude,
      longitude
    );

    let weatherData = await this._weatherRepo.fetchWeatherDataByLocation(
      plantingMonth,
      harvestMonth,
      latitude,
      longitude
    );

    if (weatherData.length < seasons.length * 30) {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];

      const currentYear = today.getFullYear();
      const startDate = new Date(currentYear - 30, 0, 1);
      const startDateString = startDate.toISOString().split('T')[0];

      const externalWeatherData =
        await this._openMeteoHistoricalClient.getDaily({
          latitude,
          longitude,
          start_date: startDateString,
          end_date: todayString,
        });

      for (const dayData of externalWeatherData) {
        await this._weatherRepo.createWeatherData(location.id, {
          day: new Date(dayData.date),
          precipitationSum: dayData.precip,
          temp2mMax: dayData.tMax,
          temp2mMin: dayData.tMin,
          windSpeed10mMax: dayData.windMax,
        });
      }

      weatherData = await this._weatherRepo.fetchWeatherDataByLocation(
        plantingMonth,
        harvestMonth,
        latitude,
        longitude
      );
    }

    const weatherDays: WeatherDay[] = weatherData.map((day) => ({
      date: new Date(day.day),
      precip: day.precipitationSum || 0,
      tMax: day.temp2mMax || 0,
      tMin: day.temp2mMin || 0,
      windMax: day.windSpeed10mMax || 0,
    }));

    const { p, lower, upper } = probability(triggerEvent, weatherDays, seasons);

    const premium = calculatePremium({
      insuredValue: LMI,
      probability: p,
      riskMargin: Number(RISK_MARGIN),
      opsCost: Number(OPS_COST),
      projectProfit: Number(PROJECT_PROFIT),
    });

    return { probability: p, lower, upper, LMI, premium };
  }
}
