import type { FastifyInstance } from 'fastify';
import QuoteRoutes from './quote.route';

export class RouteManager {
  private app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  public registerRoutes(): void {
    this.app.get('/', async () => {
      return { hello: 'world' };
    });

    const quoteRoutes = new QuoteRoutes();
    this.app.register(
      async (fastify) => {
        await quoteRoutes.quoteRoutes(fastify);
      },
      { prefix: '/api/quotes' }
    );
  }
}
