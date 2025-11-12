import type { FastifyInstance } from 'fastify';
import GeocodingRoutes from './geocoding.route';
import QuoteRoutes from './quote.route';
import WeatherRoutes from './weather.route';

export class RouteManager {
  private app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  public registerRoutes(): void {
    this.app.get('/', async () => {
      return { hello: 'world' };
    });

    this.app.get('/health', async () => {
      return { status: 'ok' };
    });

    const quoteRoutes = new QuoteRoutes();
    this.app.register(
      async (fastify) => {
        await quoteRoutes.quoteRoutes(fastify);
      },
      { prefix: '/quotes' }
    );

    const weatherRoutes = new WeatherRoutes();
    this.app.register(
      async (fastify) => {
        await weatherRoutes.weatherRoutes(fastify);
      },
      { prefix: '/weather' }
    );

    const geocodingRoutes = new GeocodingRoutes();
    this.app.register(
      async (fastify) => {
        await geocodingRoutes.geocodingRoutes(fastify);
      },
      { prefix: '/geocoding' }
    );
  }
}
