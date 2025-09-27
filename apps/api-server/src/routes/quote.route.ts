import type { FastifyInstance } from 'fastify';
import QuoteController from '../controllers/quote.controller';
import { QuoteRequestSchema } from '../schemas/quote.schema';

export default class QuoteRoutes {
  private _controller: QuoteController;

  constructor() {
    this._controller = new QuoteController();
  }

  async quoteRoutes(fastify: FastifyInstance) {
    // Create quote request
    fastify.post(
      '/',
      {
        schema: {
          body: QuoteRequestSchema,
          response: {
            202: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                quoteId: { type: 'string' },
                status: { type: 'string' },
              },
            },
          },
        },
      },
      this._controller.quoteController.bind(this._controller)
    );

    // Get quote status
    fastify.get(
      '/:quoteId/status',
      {
        schema: {
          params: {
            type: 'object',
            properties: {
              quoteId: { type: 'string' },
            },
            required: ['quoteId'],
          },
          response: {
            200: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                progress: { type: 'number' },
                result: { type: 'object' },
                error: { type: 'string' },
              },
            },
          },
        },
      },
      this._controller.getQuoteStatus.bind(this._controller)
    );
  }
}
