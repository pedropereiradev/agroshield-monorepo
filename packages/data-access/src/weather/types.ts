import type { DailyWeatherData } from './open-meteo/types';

export interface CreateWeatherDataPayload {
  regionId: number;
  weatherDataParams: DailyWeatherData;
}
