import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  ForecastRequest,
  WeatherRequest,
} from '../schemas/weather.schema';
import WeatherService from '../services/weather.service';

export default class WeatherController {
  private _service: WeatherService;

  constructor() {
    this._service = new WeatherService();
  }

  async getCurrentWeather(
    request: FastifyRequest<{ Querystring: WeatherRequest }>,
    reply: FastifyReply
  ) {
    try {
      const result = await this._service.getCurrentWeather(request.query);
      reply.send(result);
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }

  async getForecast(
    request: FastifyRequest<{ Querystring: ForecastRequest }>,
    reply: FastifyReply
  ) {
    try {
      const result = await this._service.getForecast(request.query);
      reply.send(result);
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }
}
