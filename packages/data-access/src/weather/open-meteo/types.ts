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

export type HourlyVariable =
  | 'temperature_2m'
  | 'relativehumidity_2m'
  | 'dewpoint_2m'
  | 'apparent_temperature'
  | 'pressure_msl'
  | 'surface_pressure'
  | 'precipitation'
  | 'rain'
  | 'snowfall'
  | 'snow_depth'
  | 'freezinglevel_height'
  | 'weathercode'
  | 'cloudcover'
  | 'windspeed_10m'
  | 'winddirection_10m';

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
  date: string; // ISO date string
  weatherCode?: number; // WMO weather code
  tMax?: number; // Max temperature
  tMin?: number; // Min temperature
  precip?: number; // Precipitation sum
  windMax?: number; // Max wind speed
  [key: string]: any; // Allow for additional properties
}

export interface HourlyWeatherData {
  time: string; // ISO datetime string
  temperature?: number; // Temperature in °C or °F
  precipitation?: number; // Precipitation in mm or inch
  humidity?: number; // Relative humidity in %
  windSpeed?: number; // Wind speed
  [key: string]: any; // Allow for additional properties
}

export interface HistoricalParams {
  latitude: number | number[];
  longitude: number | number[];

  // required
  start_date: string; // ISO yyyy-MM-dd
  end_date: string; // ISO yyyy-MM-dd

  // optional arrays
  hourly?: HourlyVariable[];
  daily?: DailyVariable[];

  // optional scalars
  elevation?: number;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  timezone?: string; // e.g. "Europe/Berlin" or "auto"
  cell_selection?: CellSelection;
}

export interface HistoricalResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;

  hourly?: {
    time: string[];
  } & {
    [key in HourlyVariable]?: number[];
  };
  hourly_units?: {
    [key in HourlyVariable]?: string;
  };
  daily?: {
    time: string[];
  } & {
    [key in DailyVariable]?: number[] | string[];
  };
  daily_units?: {
    [key in DailyVariable]?: string;
  };
}

export interface ForecastParams {
  latitude: number | number[];
  longitude: number | number[];

  hourly?: HourlyVariable[];
  daily?: DailyVariable[];
  current?: CurrentVariable[];

  // controls
  forecast_days?: number; // 0–16
  past_days?: number; // 0–92

  // unit & time
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  timezone?: string;
  elevation?: number;
  cell_selection?: CellSelection;
  models?: string[];

  // optional interval override
  start_date?: string; // yyyy-MM-dd
  end_date?: string; // yyyy-MM-dd
  start_hour?: string; // ISO yyyy-MM-ddThh:mm
  end_hour?: string; // ISO yyyy-MM-ddThh:mm
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;

  current_weather?: Record<CurrentVariable, string | number> & { time: string };

  hourly?: {
    time: string[];
  } & {
    [key in HourlyVariable]?: number[];
  };
  hourly_units?: {
    [key in HourlyVariable]?: string;
  };

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
  start_date: string;
  end_date: string;
  variables?: DailyVariable[];
  elevation?: number;
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  cell_selection?: CellSelection;
}

export interface GetHourlyParams {
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  variables?: HourlyVariable[];
  elevation?: number;
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  cell_selection?: CellSelection;
}

export interface GetCurrentParams {
  latitude: number;
  longitude: number;
  variables?: CurrentVariable[];
  elevation?: number;
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  cell_selection?: CellSelection;
  models?: string[];
}

export interface GetHourlyForecastParams {
  latitude: number;
  longitude: number;
  variables?: HourlyVariable[];
  elevation?: number;
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  cell_selection?: CellSelection;
  forecast_days?: number;
  past_days?: number;
  models?: string[];
}

export interface GetDailyForecastParams {
  latitude: number;
  longitude: number;
  variables?: DailyVariable[];
  elevation?: number;
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  cell_selection?: CellSelection;
  forecast_days?: number;
  past_days?: number;
  models?: string[];
}
