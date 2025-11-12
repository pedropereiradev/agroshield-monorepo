import type { FastifyReply, FastifyRequest } from 'fastify';
import type { GeocodingRequest } from '../schemas/geocoding.schema';
import GeocodingService from '../services/geocoding.service';

export default class GeocodingController {
  private _service: GeocodingService;

  constructor() {
    this._service = new GeocodingService();
  }

  async searchCities(
    request: FastifyRequest<{ Querystring: GeocodingRequest }>,
    reply: FastifyReply
  ) {
    try {
      const result = await this._service.searchCities(request.query);
      reply.send(result);
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }
}
