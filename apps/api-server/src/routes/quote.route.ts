import type { FastifyInstance } from 'fastify';
import QuoteController from '../controllers/quote.controller';
import {
  QuoteRequestSchema,
  QuoteResponseSchema,
} from '../schemas/quote.schema';

export default class QuoteRoutes {
  private _controller: QuoteController;

  constructor() {
    this._controller = new QuoteController();
  }

  async quoteRoutes(fastify: FastifyInstance) {
    fastify.post(
      '/',
      {
        schema: {
          body: QuoteRequestSchema,
          response: { 200: QuoteResponseSchema },
        },
      },
      this._controller.quoteController.bind(this._controller)
    );
  }
}
