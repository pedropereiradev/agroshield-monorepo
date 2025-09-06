import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import QuoteController from '../controllers/quote.controller';
import {
  QuoteRequestSchema,
  QuoteResponseSchema,
} from '../schemas/quote.schema';

export default async function quotesRoutes(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  const controller = new QuoteController();

  fastify.post(
    '/',
    {
      schema: {
        description: 'Generate insurance quote based on crop and location data',
        tags: ['Quotes'],
        summary: 'Generate Insurance Quote',
        body: QuoteRequestSchema,
        response: {
          200: {
            ...QuoteResponseSchema,
            description: 'Successfully generated insurance quote',
          },
        },
      },
    },
    controller.quoteController.bind(controller)
  );
}
