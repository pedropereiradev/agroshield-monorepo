import axios, { type AxiosInstance } from 'axios';
import { dailyVariables } from '../../utils/weather/constants';
import { getTimeWindow } from '../../utils/weather/time-interval';
import type {
  DailyVariable,
  DailyWeatherData,
  GetDailyParams,
  HistoricalParams,
  HistoricalResponse,
} from './types';

export class OpenMeteoHistoricalClient {
  private client: AxiosInstance;

  constructor(apiKey?: string) {
    const baseURL = 'https://archive-api.open-meteo.com/v1/archive';
    this.client = axios.create({
      baseURL,
      timeout: 40_000,
      headers: { 'Content-Type': 'application/json' },
    });

    if (apiKey) {
      this.client.interceptors.request.use((cfg) => {
        cfg.params = { ...cfg.params, apikey: apiKey };
        return cfg;
      });
    }
  }

  async getDaily(params: GetDailyParams): Promise<DailyWeatherData[]> {
    const { latitude, longitude } = params;
    const { startDate, endDate } = getTimeWindow(30);

    const response = await this.getArchive({
      latitude,
      longitude,
      start_date: startDate,
      end_date: endDate,
      daily: dailyVariables,
      timezone: 'GMT',
    });

    return this.processDailyResponse(response);
  }

  private async getArchive(
    params: HistoricalParams
  ): Promise<HistoricalResponse> {
    // try {
    const serial: Record<string, any> = { ...params };
    if (params.daily) serial.daily = params.daily.join(',');

    const resp = await this.client.get<HistoricalResponse>('', {
      params: serial,
    });
    return resp.data;
    // } catch (err) {
    // if (axios.isAxiosError(err)) {
    //   const e = err as AxiosError<{ error: boolean; reason: string }>;
    //   throw new Error(
    //     e.response?.data?.reason ?? `Open-Meteo failed: ${e.message}`
    //   );
    // }
    //   throw err;
    // }
  }

  private processDailyResponse(
    response: HistoricalResponse
  ): DailyWeatherData[] {
    if (!response.daily?.time?.length) {
      return [];
    }

    const { daily } = response;
    const days = daily.time.length;

    const result: DailyWeatherData[] = new Array(days);

    const variableMap: Readonly<Partial<Record<DailyVariable, string>>> = {
      weather_code: 'weatherCode',
      temperature_2m_max: 'temperatureMax',
      temperature_2m_min: 'temperatureMin',
      precipitation_sum: 'precipitationSum',
      wind_speed_10m_max: 'windSpeedMax',
      rain_sum: 'rainSum',
      snowfall_sum: 'snowfallSum',
      sunrise: 'sunrise',
      sunset: 'sunset',
      sunshine_duration: 'sunshineDuration',
      daylight_duration: 'daylightDuration',
      wind_gusts_10m_max: 'windGustsMax',
      wind_direction_10m_dominant: 'windDirectionDominant',
      shortwave_radiation_sum: 'shortwaveRadiationSum',
      et0_fao_evapotranspiration: 'et0FaoEvapotranspiration',
    } as const;

    const dailyEntries = Object.entries(daily).filter(
      ([key, values]) =>
        key !== 'time' && Array.isArray(values) && values.length === days
    ) as Array<[DailyVariable, (number | string)[]]>;

    for (let i = 0; i < days; i++) {
      const dayData: DailyWeatherData = {
        date: daily.time[i],
      };

      for (const [variable, values] of dailyEntries) {
        const mappedKey = variableMap[variable];
        if (mappedKey) {
          (dayData as any)[mappedKey] = values[i];
        }
      }

      result[i] = dayData;
    }

    return result;
  }
}
