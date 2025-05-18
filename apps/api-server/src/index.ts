import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', async () => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    app.log.info('Server listening on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
