import api from '../config/api';

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

export interface GeocodingResponse {
  results: CityResult[];
}

export interface GeocodingRequest {
  query: string;
  limit?: number;
}

/**
 * Search for cities by name
 */
export const searchCities = async (
  request: GeocodingRequest
): Promise<GeocodingResponse> => {
  try {
    const response = await api.get<GeocodingResponse>('/geocoding/search', {
      params: {
        query: request.query,
        limit: request.limit || 10,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed to search cities: ${error.response?.data?.error || error.message}`
    );
  }
};
