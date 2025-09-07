import type { DailyVariable } from '../../weather/open-meteo/types';

export const dailyVariables = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'rain_sum',
  'snowfall_sum',
  'wind_speed_10m_max',
  'sunrise',
  'sunset',
  'sunshine_duration',
  'daylight_duration',
  'wind_gusts_10m_max',
  'wind_direction_10m_dominant',
  'shortwave_radiation_sum',
  'et0_fao_evapotranspiration',
] as DailyVariable[];
