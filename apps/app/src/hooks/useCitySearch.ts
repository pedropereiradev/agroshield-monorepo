import * as geocodingApi from '@/services/geocoding/api';
import { useCallback, useState } from 'react';
import type { Location } from './useGeolocation';

export interface CityResult extends Location {
  name: string;
  admin1?: string;
  admin2?: string;
  countryCode: string;
  population?: number;
}

/**
 * Hook for searching cities using the API server
 */
export function useCitySearch() {
  const [results, setResults] = useState<CityResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCities = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await geocodingApi.searchCities({ query, limit: 10 });

      const cities: CityResult[] = response.results.map((result) => ({
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name,
        city: result.name,
        region: result.admin1,
        country: result.country,
        admin1: result.admin1,
        admin2: result.admin2,
        countryCode: result.countryCode,
        population: result.population,
      }));

      setResults(cities);
    } catch (err) {
      console.error('City search error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar cidades');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    searchCities,
    clearResults,
  };
}

/**
 * Format city result for display
 */
export function formatCityDisplay(city: CityResult): string {
  const parts = [city.name];

  if (city.admin1) {
    parts.push(city.admin1);
  }

  if (city.countryCode !== 'BR' && city.country) {
    parts.push(city.country);
  }

  return parts.join(', ');
}
