import axios, { type AxiosError, type AxiosInstance } from 'axios';

export interface CurrentWeatherParams {
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface CurrentWeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  timestamp: string;
}

interface OpenMeteoCurrentResponse {
  current: {
    time: string;
    temperature_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
}

export class OpenMeteoCurrentWeatherClient {
  private client: AxiosInstance;
  private cache = new Map<
    string,
    { data: CurrentWeatherData; timestamp: number }
  >();
  private readonly cacheTTL = 10 * 60 * 1000; // 10 minutes

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

  async getCurrentWeather(
    params: CurrentWeatherParams
  ): Promise<CurrentWeatherData> {
    const cacheKey = `${params.latitude.toFixed(2)},${params.longitude.toFixed(2)}`;

    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const response = await this.client.get<OpenMeteoCurrentResponse>('', {
        params: {
          latitude: params.latitude,
          longitude: params.longitude,
          current:
            'temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,weather_code',
          timezone: params.timezone || 'America/Sao_Paulo',
        },
      });

      const result: CurrentWeatherData = {
        temperature: response.data.current.temperature_2m,
        precipitation: response.data.current.precipitation,
        windSpeed: response.data.current.wind_speed_10m,
        weatherCode: response.data.current.weather_code,
        humidity: response.data.current.relative_humidity_2m,
        timestamp: response.data.current.time,
      };

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      this.cleanCache();

      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ error: boolean; reason: string }>;
        throw new Error(
          e.response?.data?.reason ??
            `Open-Meteo current weather error: ${e.message}`
        );
      }
      throw err;
    }
  }

  private cleanCache() {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTTL) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }

    if (this.cache.size > 100) {
      const entries = Array.from(this.cache.entries()).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      );

      const toRemove = entries.slice(0, this.cache.size - 100);
      for (const [key] of toRemove) {
        this.cache.delete(key);
      }
    }
  }
}
