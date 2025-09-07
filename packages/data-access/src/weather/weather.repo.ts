import { and, eq, or, sql } from 'drizzle-orm';
import { db } from '../db/client';
import { weatherData } from '../entities';
import type { CreateWeatherDataPayload } from './types';

export class WeatherRepo {
  private _db;

  constructor() {
    this._db = db;
  }

  async createWeatherData({
    regionId,
    weatherDataParams,
  }: CreateWeatherDataPayload) {
    try {
      const newWeatherData = await this._db
        .insert(weatherData)
        .values({
          regionId,
          date: weatherDataParams.date,
          weatherCode: weatherDataParams.weatherCode,
          temperatureMax: weatherDataParams.temperatureMax,
          temperatureMin: weatherDataParams.temperatureMin,
          precipitationSum: weatherDataParams.precipitationSum,
          windSpeedMax: weatherDataParams.windSpeedMax,
          rainSum: weatherDataParams.rainSum,
          snowfallSum: weatherDataParams.snowfallSum,
          sunrise: weatherDataParams.sunrise
            ? new Date(weatherDataParams.sunrise)
            : null,
          sunset: weatherDataParams.sunset
            ? new Date(weatherDataParams.sunset)
            : null,
          sunshineDuration: weatherDataParams.sunshineDuration,
          daylightDuration: weatherDataParams.daylightDuration,
          windGustsMax: weatherDataParams.windGustsMax,
          windDirectionDominant: weatherDataParams.windDirectionDominant,
          shortwaveRadiationSum: weatherDataParams.shortwaveRadiationSum,
          et0FaoEvapotranspiration: weatherDataParams.et0FaoEvapotranspiration,
        })
        .returning();

      return newWeatherData[0];
    } catch (error) {
      console.error('Error creating weather data:', error);
      console.error('Weather data params:', weatherDataParams);
      throw error;
    }
  }

  async fetchWeatherDataByRegion(
    regionId: number,
    startMonth: number,
    endMonth: number
  ) {
    try {
      console.log('fetchWeatherDataByRegion', {
        regionId,
        startMonth,
        endMonth,
      });

      let monthCondition;

      if (startMonth <= endMonth) {
        monthCondition = and(
          sql`EXTRACT(MONTH FROM ${weatherData.date}) >= ${startMonth}`,
          sql`EXTRACT(MONTH FROM ${weatherData.date}) <= ${endMonth}`
        );
      } else {
        monthCondition = or(
          sql`EXTRACT(MONTH FROM ${weatherData.date}) >= ${startMonth}`,
          sql`EXTRACT(MONTH FROM ${weatherData.date}) <= ${endMonth}`
        );
      }

      const weather = await this._db
        .select()
        .from(weatherData)
        .where(and(eq(weatherData.regionId, regionId), monthCondition));

      return weather;
    } catch (error) {
      console.error('Error fetching weather data by region:', error);
      throw error;
    }
  }
}
