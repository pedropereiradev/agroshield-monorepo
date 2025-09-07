import {
  type WeatherDay,
  generateCustomSeasons,
} from '@agroshield/core-domain';
import {
  LocationRegionRepo,
  LocationRepo,
  OpenMeteoHistoricalClient,
  WeatherRepo,
} from '@agroshield/data-access';
import type { QuoteRequest } from '../schemas/quote.schema';

export class WeatherDataService {
  private _weatherRepo: WeatherRepo;
  private _locationRepo: LocationRepo;
  private _locationRegionRepo: LocationRegionRepo;
  private _openMeteoHistoricalClient: OpenMeteoHistoricalClient;

  constructor() {
    this._locationRepo = new LocationRepo();
    this._locationRegionRepo = new LocationRegionRepo();
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

    const region = await this._locationRegionRepo.findOrCreateRegion(
      latitude,
      longitude
    );

    await this._locationRepo.findOrCreateLocation(
      latitude,
      longitude,
      region.id
    );

    let weatherData = await this._weatherRepo.fetchWeatherDataByRegion(
      region.id,
      plantingMonth,
      harvestMonth
    );

    if (weatherData.length < seasons.length * 30) {
      await this._fetchExternalWeatherData(
        region.id,
        region.masterLatitude,
        region.masterLongitude
      );

      weatherData = await this._weatherRepo.fetchWeatherDataByRegion(
        region.id,
        plantingMonth,
        harvestMonth
      );
    }

    return weatherData.map((day) => ({
      date: new Date(day.date),
      precip: day.precipitationSum || 0,
      tMax: day.temperatureMax || 0,
      tMin: day.temperatureMin || 0,
      windMax: day.windSpeedMax || 0,
    }));
  }

  private async _fetchExternalWeatherData(
    regionId: number,
    latitude: number,
    longitude: number
  ): Promise<void> {
    try {
      const externalWeatherData =
        await this._openMeteoHistoricalClient.getDaily({
          latitude,
          longitude,
        });

      await Promise.all(
        externalWeatherData.map((dayData) => {
          this._weatherRepo.createWeatherData({
            regionId,
            weatherDataParams: dayData,
          });
        })
      );
    } catch (error) {
      console.error('Error fetching external weather data:', error);
      throw new Error('Failed to fetch external weather data');
    }
  }
}
