export type DailyVariable =
  | 'weather_code'
  | 'temperature_2m_max'
  | 'temperature_2m_min'
  | 'apparent_temperature_max'
  | 'apparent_temperature_min'
  | 'precipitation_sum'
  | 'rain_sum'
  | 'snowfall_sum'
  | 'precipitation_hours'
  | 'sunrise'
  | 'sunset'
  | 'sunshine_duration'
  | 'daylight_duration'
  | 'wind_speed_10m_max'
  | 'wind_gusts_10m_max'
  | 'wind_direction_10m_dominant'
  | 'shortwave_radiation_sum'
  | 'et0_fao_evapotranspiration';

export type CurrentVariable =
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'apparent_temperature'
  | 'is_day'
  | 'precipitation'
  | 'rain'
  | 'showers'
  | 'snowfall'
  | 'weather_code'
  | 'cloud_cover'
  | 'pressure_msl'
  | 'surface_pressure'
  | 'wind_speed_10m'
  | 'wind_direction_10m'
  | 'wind_gusts_10m';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'ms' | 'mph' | 'kn';
export type PrecipitationUnit = 'mm' | 'inch';
export type TimeFormat = 'iso8601' | 'unixtime';
export type CellSelection = 'land' | 'sea' | 'nearest';

export interface DailyWeatherData {
  date: string;
  weatherCode?: number;
  temperatureMax?: number;
  temperatureMin?: number;
  precipitationSum?: number;
  windSpeedMax?: number;
  rainSum?: number;
  snowfallSum?: number;
  sunrise?: string;
  sunset?: string;
  sunshineDuration?: number;
  daylightDuration?: number;
  windGustsMax?: number;
  windDirectionDominant?: number;
  shortwaveRadiationSum?: number;
  et0FaoEvapotranspiration?: number;
}

export interface HistoricalParams {
  latitude: number;
  longitude: number;

  start_date: string;
  end_date: string;

  daily?: DailyVariable[];

  timezone?: string;
}

export interface HistoricalResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;

  daily?: {
    time: string[];
  } & {
    [key in DailyVariable]?: number[] | string[];
  };
  daily_units?: {
    [key in DailyVariable]?: string;
  };
}

export interface GetDailyParams {
  latitude: number;
  longitude: number;
}
