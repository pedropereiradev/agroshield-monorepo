import { and, between, eq, or, sql } from 'drizzle-orm';
import { db } from '../db/client';
import { locations, weatherData } from '../entities';

export class WeatherRepo {
  private _db;

  constructor() {
    this._db = db;
  }

  async createWeatherData(
    locationId: string,
    weatherDataParams: {
      day: Date;
      precipitationSum?: number;
      precipitationHours?: number;
      temp2mMax?: number;
      temp2mMin?: number;
      windSpeed10mMax?: number;
      windGusts10mMax?: number;
      weatherCode?: number;
      shortwaveRadiation?: number;
      et0Fao?: number;
    }
  ) {
    try {
      const formattedDay = weatherDataParams.day.toISOString().split('T')[0];

      const newWeatherData = await this._db
        .insert(weatherData)
        .values({
          locationId,
          ...weatherDataParams,
          day: formattedDay,
        })
        .returning();

      return newWeatherData[0];
    } catch (error) {
      console.error('Error creating weather data:', error);
      throw error;
    }
  }

  async fetchWeatherDataByLocation(
    startMonth: number,
    endMonth: number,
    latitude: number,
    longitude: number,
    radiusInDegrees = 0.045
  ) {
    try {
      let monthCondition;

      if (startMonth <= endMonth) {
        monthCondition = and(
          sql`EXTRACT(MONTH FROM ${weatherData.day}) >= ${startMonth}`,
          sql`EXTRACT(MONTH FROM ${weatherData.day}) <= ${endMonth}`
        );
      } else {
        monthCondition = or(
          sql`EXTRACT(MONTH FROM ${weatherData.day}) >= ${startMonth}`,
          sql`EXTRACT(MONTH FROM ${weatherData.day}) <= ${endMonth}`
        );
      }

      const weather = await this._db
        .select({ weatherData })
        .from(weatherData)
        .innerJoin(locations, eq(weatherData.locationId, locations.id))
        .where(
          and(
            between(
              locations.latitude,
              latitude - radiusInDegrees,
              latitude + radiusInDegrees
            ),
            between(
              locations.longitude,
              longitude - radiusInDegrees,
              longitude + radiusInDegrees
            ),
            monthCondition
          )
        );

      return weather.map((data) => data.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);

      throw error;
    }
  }
}
