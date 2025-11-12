import axios, { type AxiosError, type AxiosInstance } from 'axios';

export interface GeocodingParams {
  query: string;
  limit?: number;
  language?: string;
}

export interface CityResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  admin1?: string;
  admin2?: string;
  population?: number;
}

interface OpenMeteoGeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  population?: number;
}

interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[];
}

export class OpenMeteoGeocodingClient {
  private client: AxiosInstance;
  private cache = new Map<string, { data: CityResult[]; timestamp: number }>();
  private readonly cacheTTL = 60 * 60 * 1000; // 1 hour

  constructor() {
    this.client = axios.create({
      baseURL: 'https://geocoding-api.open-meteo.com/v1',
      timeout: 10_000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async searchCities(params: GeocodingParams): Promise<CityResult[]> {
    const cacheKey = `${params.query.toLowerCase()}-${params.limit || 10}`;

    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const response = await this.client.get<OpenMeteoGeocodingResponse>(
        '/search',
        {
          params: {
            name: params.query,
            count: params.limit || 10,
            language: params.language || 'pt',
            format: 'json',
          },
        }
      );

      let cities: CityResult[] = [];

      if (response.data.results && response.data.results.length > 0) {
        cities = response.data.results.map((result) => ({
          name: result.name,
          latitude: result.latitude,
          longitude: result.longitude,
          country: result.country,
          countryCode: result.country_code,
          admin1: result.admin1,
          admin2: result.admin2,
          population: result.population,
        }));

        cities.sort((a, b) => {
          if (a.countryCode === 'BR' && b.countryCode !== 'BR') return -1;
          if (a.countryCode !== 'BR' && b.countryCode === 'BR') return 1;
          return (b.population || 0) - (a.population || 0);
        });
      }

      this.cache.set(cacheKey, {
        data: cities,
        timestamp: Date.now(),
      });

      this.cleanCache();

      return cities;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ error: boolean; reason: string }>;
        throw new Error(
          e.response?.data?.reason ?? `Open-Meteo geocoding error: ${e.message}`
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

    if (this.cache.size > 500) {
      const entries = Array.from(this.cache.entries()).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      );

      const toRemove = entries.slice(0, this.cache.size - 500);
      for (const [key] of toRemove) {
        this.cache.delete(key);
      }
    }
  }
}
