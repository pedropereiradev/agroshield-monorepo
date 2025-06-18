import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  DailyVariable,
  DailyWeatherData,
  GetDailyParams,
  GetHourlyParams,
  HistoricalParams,
  HistoricalResponse,
  HourlyVariable,
  HourlyWeatherData,
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

  private processDailyResponse(
    response: HistoricalResponse
  ): DailyWeatherData[] {
    if (
      !response.daily ||
      !response.daily.time ||
      response.daily.time.length === 0
    ) {
      return [];
    }

    const result: DailyWeatherData[] = [];
    const days = response.daily.time.length;

    const variableMap: Partial<Record<DailyVariable, string>> = {
      weather_code: 'weatherCode',
      temperature_2m_max: 'tMax',
      temperature_2m_min: 'tMin',
      precipitation_sum: 'precip',
      wind_speed_10m_max: 'windMax',
    };

    for (let i = 0; i < days; i++) {
      const dayData: DailyWeatherData = {
        date: response.daily.time[i],
      };

      for (const [key, values] of Object.entries(response.daily)) {
        if (key !== 'time' && Array.isArray(values) && values.length > i) {
          const mappedKey = variableMap[key as DailyVariable] || key;
          dayData[mappedKey] = values[i];
        }
      }

      result.push(dayData);
    }

    return result;
  }

  private processHourlyResponse(
    response: HistoricalResponse
  ): HourlyWeatherData[] {
    if (
      !response.hourly ||
      !response.hourly.time ||
      response.hourly.time.length === 0
    ) {
      return [];
    }

    const result: HourlyWeatherData[] = [];
    const hours = response.hourly.time.length;

    const variableMap: Partial<Record<HourlyVariable, string>> = {
      temperature_2m: 'temperature',
      precipitation: 'precipitation',
      relativehumidity_2m: 'humidity',
      windspeed_10m: 'windSpeed',
    };

    for (let i = 0; i < hours; i++) {
      const hourData: HourlyWeatherData = {
        time: response.hourly.time[i],
      };

      for (const [key, values] of Object.entries(response.hourly)) {
        if (key !== 'time' && Array.isArray(values) && values.length > i) {
          const mappedKey = variableMap[key as HourlyVariable] || key;
          hourData[mappedKey] = values[i];
        }
      }

      result.push(hourData);
    }

    return result;
  }

  async getDaily(params: GetDailyParams): Promise<DailyWeatherData[]> {
    const {
      latitude,
      longitude,
      start_date,
      end_date,
      variables = [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'wind_speed_10m_max',
      ],
      ...opts
    } = params;

    const response = await this.getArchive({
      latitude,
      longitude,
      start_date,
      end_date,
      daily: variables,
      timezone: opts.timezone ?? 'auto',
      elevation: opts.elevation,
      temperature_unit: opts.temperature_unit,
      precipitation_unit: opts.precipitation_unit,
      timeformat: opts.timeformat,
      cell_selection: opts.cell_selection,
    });

    return this.processDailyResponse(response);
  }

  async getHourly(params: GetHourlyParams): Promise<HourlyWeatherData[]> {
    const {
      latitude,
      longitude,
      start_date,
      end_date,
      variables = ['temperature_2m', 'precipitation'],
      ...opts
    } = params;

    const response = await this.getArchive({
      latitude,
      longitude,
      start_date,
      end_date,
      hourly: variables,
      timezone: opts.timezone ?? 'auto',
      elevation: opts.elevation,
      temperature_unit: opts.temperature_unit,
      wind_speed_unit: opts.wind_speed_unit,
      precipitation_unit: opts.precipitation_unit,
      timeformat: opts.timeformat,
      cell_selection: opts.cell_selection,
    });

    return this.processHourlyResponse(response);
  }
}
