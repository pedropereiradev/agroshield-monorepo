import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  CellSelection,
  DailyVariable,
  HistoricalParams,
  HistoricalResponse,
  HourlyVariable,
  PrecipitationUnit,
  TemperatureUnit,
  TimeFormat,
  WindSpeedUnit,
} from './types';

export class OpenMeteoHistoricalClient {
  private client: AxiosInstance;

  constructor(apiKey?: string) {
    const baseURL = 'https://archive-api.open-meteo.com/v1/archive';
    this.client = axios.create({
      baseURL,
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
   * Low-level access to /v1/archive
   */
  async getArchive(params: HistoricalParams): Promise<HistoricalResponse> {
    try {
      const serial: Record<string, any> = { ...params };
      if (params.hourly) serial.hourly = params.hourly.join(',');
      if (params.daily) serial.daily = params.daily.join(',');
      if (Array.isArray(params.latitude))
        serial.latitude = params.latitude.join(',');
      if (Array.isArray(params.longitude))
        serial.longitude = params.longitude.join(',');

      const resp = await this.client.get<HistoricalResponse>('', {
        params: serial,
      });
      return resp.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ error: boolean; reason: string }>;
        throw new Error(
          e.response?.data?.reason ?? `Open-Meteo failed: ${e.message}`
        );
      }
      throw err;
    }
  }

  /**
   * Fetch daily aggregates for a single location
   */
  async getDaily(
    latitude: number,
    longitude: number,
    start_date: string,
    end_date: string,
    variables: DailyVariable[] = [
      'weather_code',
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
    }
  ) {
    return this.getArchive({
      latitude,
      longitude,
      start_date,
      end_date,
      daily: variables,
      timezone: opts?.timezone ?? 'auto',
      elevation: opts?.elevation,
      temperature_unit: opts?.temperature_unit,
      precipitation_unit: opts?.precipitation_unit,
      timeformat: opts?.timeformat,
      cell_selection: opts?.cell_selection,
    });
  }

  /**
   * Fetch hourly data for a single location
   */
  async getHourly(
    latitude: number,
    longitude: number,
    start_date: string,
    end_date: string,
    variables: HourlyVariable[] = ['temperature_2m', 'precipitation'],
    opts?: {
      elevation?: number;
      timezone?: string;
      temperature_unit?: TemperatureUnit;
      wind_speed_unit?: WindSpeedUnit;
      precipitation_unit?: PrecipitationUnit;
      timeformat?: TimeFormat;
      cell_selection?: CellSelection;
    }
  ) {
    return this.getArchive({
      latitude,
      longitude,
      start_date,
      end_date,
      hourly: variables,
      timezone: opts?.timezone ?? 'auto',
      elevation: opts?.elevation,
      temperature_unit: opts?.temperature_unit,
      wind_speed_unit: opts?.wind_speed_unit,
      precipitation_unit: opts?.precipitation_unit,
      timeformat: opts?.timeformat,
      cell_selection: opts?.cell_selection,
    });
  }
}
