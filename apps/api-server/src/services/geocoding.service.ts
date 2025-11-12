import { OpenMeteoGeocodingClient } from '@agroshield/data-access';
import type {
  GeocodingRequest,
  GeocodingResponse,
} from '../schemas/geocoding.schema';

export default class GeocodingService {
  private client: OpenMeteoGeocodingClient;

  constructor() {
    this.client = new OpenMeteoGeocodingClient();
  }

  /**
   * Search for cities by name
   * Uses OpenMeteoGeocodingClient from data-access package
   */
  async searchCities(request: GeocodingRequest): Promise<GeocodingResponse> {
    try {
      const cities = await this.client.searchCities({
        query: request.query,
        limit: request.limit || 10,
        language: 'pt',
      });

      return {
        results: cities,
      };
    } catch (error) {
      throw new Error(
        `Failed to search cities: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
