import 'dotenv/config';
import fastifyCors from '@fastify/cors';
import fastify, { type FastifyInstance } from 'fastify';
import { RouteManager } from './routes';

class Application {
  private app: FastifyInstance;
  private routeManager: RouteManager;
  private port: number;
  private host: string;

  constructor() {
    this.app = fastify({ logger: true }).register(fastifyCors, {
      origin: (origin, cb) => {
        if (!origin) {
          cb(null, true);
          return;
        }
        const hostname = new URL(origin as string).hostname;
        if (hostname === 'localhost') {
          cb(null, true);
          return;
        }
        cb(new Error('Not allowed'), false);
      },
    });
    this.routeManager = new RouteManager(this.app);
    this.port = Number(process.env.PORT) || 3000;
    this.host = process.env.HOST || '0.0.0.0';

    this.setupServer();
  }

  private setupServer(): void {
    this.routeManager.registerRoutes();

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
      await this.app.listen({ port: this.port, host: this.host });
      this.app.log.info(`Server listening on http://localhost:${this.port}`);
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
