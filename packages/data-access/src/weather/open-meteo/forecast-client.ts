import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  CellSelection,
  CurrentVariable,
  DailyVariable,
  ForecastParams,
  ForecastResponse,
  HourlyVariable,
  PrecipitationUnit,
  TemperatureUnit,
  TimeFormat,
  WindSpeedUnit,
} from './types';

export class OpenMeteoForecastClient {
  private client: AxiosInstance;

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: 'https://api.open-meteo.com/v1/forecast',
      timeout: 15_000,
      headers: { 'Content-Type': 'application/json' },
    });

    if (apiKey) {
      this.client.interceptors.request.use((cfg) => {
        cfg.params = { ...cfg.params, apikey: apiKey };
        return cfg;
      });
    }
  }

  /**
   * Low-level call to /v1/forecast
   */
  async getForecast(params: ForecastParams): Promise<ForecastResponse> {
    try {
      const serial: Record<string, any> = { ...params };

      if (params.hourly) serial.hourly = params.hourly.join(',');
      if (params.daily) serial.daily = params.daily.join(',');
      if (params.current) serial.current = params.current.join(',');
      if (Array.isArray(params.latitude))
        serial.latitude = params.latitude.join(',');
      if (Array.isArray(params.longitude))
        serial.longitude = params.longitude.join(',');

      const resp = await this.client.get<ForecastResponse>('', {
        params: serial,
      });
      return resp.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ error: boolean; reason: string }>;
        throw new Error(
          e.response?.data?.reason ?? `Open-Meteo forecast error: ${e.message}`
        );
      }
      throw err;
    }
  }

  /**
   * Fetch “current” conditions only
   */
  async getCurrent(
    latitude: number,
    longitude: number,
    opts?: {
      elevation?: number;
      timezone?: string;
      temperature_unit?: TemperatureUnit;
      wind_speed_unit?: WindSpeedUnit;
      precipitation_unit?: PrecipitationUnit;
      timeformat?: TimeFormat;
      cell_selection?: CellSelection;
      models?: string[];
    }
  ) {
    return this.getForecast({
      latitude,
      longitude,
      current:
        (opts?.models as CurrentVariable[]) ??
        ([
          'temperature_2m',
          'windspeed_10m',
          'precipitation',
        ] as CurrentVariable[]),
      timezone: opts?.timezone ?? 'auto',
      elevation: opts?.elevation,
      temperature_unit: opts?.temperature_unit,
      wind_speed_unit: opts?.wind_speed_unit,
      precipitation_unit: opts?.precipitation_unit,
      timeformat: opts?.timeformat,
      cell_selection: opts?.cell_selection,
      models: opts?.models,
    });
  }

  /**
   * Fetch hourly forecast (default: next 7 days → 168 hours)
   */
  async getHourlyForecast(
    latitude: number,
    longitude: number,
    vars: HourlyVariable[] = ['temperature_2m', 'precipitation'],
    opts?: {
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
  ) {
    return this.getForecast({
      latitude,
      longitude,
      hourly: vars,
      timezone: opts?.timezone ?? 'auto',
      elevation: opts?.elevation,
      temperature_unit: opts?.temperature_unit,
      wind_speed_unit: opts?.wind_speed_unit,
      precipitation_unit: opts?.precipitation_unit,
      timeformat: opts?.timeformat,
      cell_selection: opts?.cell_selection,
      forecast_days: opts?.forecast_days,
      past_days: opts?.past_days,
      models: opts?.models,
    });
  }

  /**
   * Fetch daily aggregates (up to 16 days)
   */
  async getDailyForecast(
    latitude: number,
    longitude: number,
    vars: DailyVariable[] = [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
    ],
    opts?: {
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
  ) {
    return this.getForecast({
      latitude,
      longitude,
      daily: vars,
      timezone: opts?.timezone ?? 'auto',
      elevation: opts?.elevation,
      temperature_unit: opts?.temperature_unit,
      precipitation_unit: opts?.precipitation_unit,
      timeformat: opts?.timeformat,
      cell_selection: opts?.cell_selection,
      forecast_days: opts?.forecast_days,
      past_days: opts?.past_days,
      models: opts?.models,
    });
  }
}
