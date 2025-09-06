import { getApiServerConfig } from '@agroshield/config';
import fastifyCors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify, { type FastifyInstance } from 'fastify';

class Application {
  private app: FastifyInstance;
  private port: number;
  private host: string;

  constructor() {
    const config = getApiServerConfig();

    this.app = fastify({ logger: true });
    this.port = config.port;
    this.host = config.host;

    this.setupPlugins(config);
    this.setupErrorHandler();
  }

  private async setupPlugins(
    config: ReturnType<typeof getApiServerConfig>
  ): Promise<void> {
    await this.app.register(fastifyCors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await this.app.register(swagger, {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'AgroShield API',
          description: 'Decentralized parametric crop insurance platform API',
          version: '0.1.0',
          contact: {
            name: 'AgroShield Team',
            url: 'https://github.com/pedropereiradev/agroshield-monorepo',
          },
        },
        servers: [
          {
            url: `http://localhost:${config.port}`,
            description: 'Development server',
          },
        ],
        tags: [
          { name: 'Quotes', description: 'Insurance quote operations' },
          { name: 'Health', description: 'Health check endpoints' },
        ],
      },
    });

    await this.app.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
    });

    this.app.get(
      '/',
      {
        schema: {
          description: 'API root endpoint',
          tags: ['Health'],
          summary: 'Root endpoint',
          response: {
            200: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                version: { type: 'string' },
                docs: { type: 'string' },
              },
            },
          },
        },
      },
      async () => {
        return {
          message: 'AgroShield API',
          version: '0.1.0',
          docs: '/docs',
        };
      }
    );

    await this.app.register(
      async (fastify) => {
        const healthRoutes = (await import('./routes/health')).default;
        const quotesRoutes = (await import('./routes/quotes')).default;

        await fastify.register(healthRoutes, { prefix: '/health' });
        await fastify.register(quotesRoutes, { prefix: '/quotes' });
      },
      { prefix: '/' }
    );
  }

  private setupErrorHandler(): void {
    this.app.setErrorHandler((error, _request, reply) => {
      this.app.log.error(error);

      const statusCode = error.statusCode || 500;

      reply.status(statusCode).send({
        error: true,
        message: error.message || 'Internal Server Error',
        statusCode,
      });
    });
  }

  public async start(): Promise<void> {
    try {
      await this.app.ready();
      await this.app.listen({ port: this.port, host: this.host });

      this.app.printRoutes();
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.app.close();
      this.app.log.info('Application shut down');
    } catch (err) {
      this.app.log.error('Error during shutdown:', err);
      process.exit(1);
    }
  }
}

const application = new Application();
application.start();

process.on('SIGINT', async () => {
  console.log('SIGINT signal received. Shutting down...');
  await application.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Shutting down...');
  await application.stop();
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
