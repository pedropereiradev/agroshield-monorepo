import type { FastifyInstance } from 'fastify';
import WeatherController from '../controllers/weather.controller';
import {
  ForecastRequestSchema,
  ForecastResponseSchema,
  HourlyForecastResponseSchema,
  WeatherRequestSchema,
  WeatherResponseSchema,
} from '../schemas/weather.schema';

export default class WeatherRoutes {
  private _controller: WeatherController;

  constructor() {
    this._controller = new WeatherController();
  }

  async weatherRoutes(fastify: FastifyInstance) {
    fastify.get(
      '/current',
      {
        schema: {
          querystring: WeatherRequestSchema,
          response: { 200: WeatherResponseSchema },
        },
      },
      this._controller.getCurrentWeather.bind(this._controller)
    );

    fastify.get(
      '/forecast',
      {
        schema: {
          querystring: ForecastRequestSchema,
          response: { 200: ForecastResponseSchema },
        },
      },
      this._controller.getForecast.bind(this._controller)
    );

    fastify.get(
      '/hourly',
      {
        schema: {
          querystring: WeatherRequestSchema,
          response: { 200: HourlyForecastResponseSchema },
        },
      },
      this._controller.getHourlyForecast.bind(this._controller)
    );
  }
}
