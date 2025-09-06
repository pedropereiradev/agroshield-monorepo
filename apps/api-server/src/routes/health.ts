import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function healthRoutes(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'Health check endpoint',
        tags: ['Health'],
        summary: 'Health Check',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string', format: 'date-time' },
              uptime: { type: 'number' },
            },
            description: 'Service health status',
          },
        },
      },
    },
    async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }
  );
}
