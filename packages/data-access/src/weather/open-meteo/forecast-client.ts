import axios, { type AxiosError, type AxiosInstance } from 'axios';
import type {
  DailyVariable,
  DailyWeatherData,
  ForecastParams,
  ForecastResponse,
  GetDailyForecastParams,
  GetHourlyForecastParams,
  HourlyVariable,
  HourlyWeatherData,
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

  private processDailyResponse(response: ForecastResponse): DailyWeatherData[] {
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
      temperature_2m_max: 'tMax',
      temperature_2m_min: 'tMin',
      precipitation_sum: 'precip',
      wind_speed_10m_max: 'windMax',
      weather_code: 'weatherCode',
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
    response: ForecastResponse
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

  async getDailyForecast(
    params: GetDailyForecastParams
  ): Promise<DailyWeatherData[]> {
    const {
      latitude,
      longitude,
      variables = [
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
      ],
      ...opts
    } = params;

    const response = await this.getForecast({
      latitude,
      longitude,
      daily: variables,
      timezone: opts.timezone ?? 'auto',
      elevation: opts.elevation,
      temperature_unit: opts.temperature_unit,
      precipitation_unit: opts.precipitation_unit,
      timeformat: opts.timeformat,
      cell_selection: opts.cell_selection,
      forecast_days: opts.forecast_days,
      past_days: opts.past_days,
      models: opts.models,
    });

    return this.processDailyResponse(response);
  }

  async getHourlyForecast(
    params: GetHourlyForecastParams
  ): Promise<HourlyWeatherData[]> {
    const {
      latitude,
      longitude,
      variables = ['temperature_2m', 'precipitation'],
      ...opts
    } = params;

    const response = await this.getForecast({
      latitude,
      longitude,
      hourly: variables,
      timezone: opts.timezone ?? 'auto',
      elevation: opts.elevation,
      temperature_unit: opts.temperature_unit,
      wind_speed_unit: opts.wind_speed_unit,
      precipitation_unit: opts.precipitation_unit,
      timeformat: opts.timeformat,
      cell_selection: opts.cell_selection,
      forecast_days: opts.forecast_days,
      past_days: opts.past_days,
      models: opts.models,
    });

    return this.processHourlyResponse(response);
  }
}
