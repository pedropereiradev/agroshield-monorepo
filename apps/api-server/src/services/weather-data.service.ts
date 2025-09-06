import {
  type WeatherDay,
  generateCustomSeasons,
} from '@agroshield/core-domain';
import {
  LocationRepo,
  OpenMeteoHistoricalClient,
  WeatherRepo,
} from '@agroshield/data-access';
import type { QuoteRequest } from '../schemas/quote.schema';

export class WeatherDataService {
  private _weatherRepo: WeatherRepo;
  private _locationRepo: LocationRepo;
  private _openMeteoHistoricalClient: OpenMeteoHistoricalClient;

  constructor() {
    this._locationRepo = new LocationRepo();
    this._weatherRepo = new WeatherRepo();
    this._openMeteoHistoricalClient = new OpenMeteoHistoricalClient();
  }

  async getWeatherData(req: QuoteRequest): Promise<WeatherDay[]> {
    const { crop, plantingMonth, harvestMonth, latitude, longitude } = req;

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

    // If we don't have enough data, fetch from external API
    if (weatherData.length < seasons.length * 30) {
      await this._fetchExternalWeatherData(location.id, latitude, longitude);

      weatherData = await this._weatherRepo.fetchWeatherDataByLocation(
        plantingMonth,
        harvestMonth,
        latitude,
        longitude
      );
    }

    return weatherData.map((day) => ({
      date: new Date(day.day),
      precip: day.precipitationSum || 0,
      tMax: day.temp2mMax || 0,
      tMin: day.temp2mMin || 0,
      windMax: day.windSpeed10mMax || 0,
    }));
  }

  private async _fetchExternalWeatherData(
    locationId: string,
    latitude: number,
    longitude: number
  ): Promise<void> {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear - 30, 0, 1);
    const startDateString = startDate.toISOString().split('T')[0];

    const externalWeatherData = await this._openMeteoHistoricalClient.getDaily({
      latitude,
      longitude,
      start_date: startDateString,
      end_date: todayString,
    });

    for (const dayData of externalWeatherData) {
      await this._weatherRepo.createWeatherData(locationId, {
        day: new Date(dayData.date),
        precipitationSum: dayData.precip,
        temp2mMax: dayData.tMax,
        temp2mMin: dayData.tMin,
        windSpeed10mMax: dayData.windMax,
      });
    }
  }
}
