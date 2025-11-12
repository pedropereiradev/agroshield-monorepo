import type { FastifyInstance } from 'fastify';
import GeocodingController from '../controllers/geocoding.controller';
import {
  GeocodingRequestSchema,
  GeocodingResponseSchema,
} from '../schemas/geocoding.schema';

export default class GeocodingRoutes {
  private _controller: GeocodingController;

  constructor() {
    this._controller = new GeocodingController();
  }

  async geocodingRoutes(fastify: FastifyInstance) {
    fastify.get(
      '/search',
      {
        schema: {
          querystring: GeocodingRequestSchema,
          response: { 200: GeocodingResponseSchema },
        },
      },
      this._controller.searchCities.bind(this._controller)
    );
  }
}
