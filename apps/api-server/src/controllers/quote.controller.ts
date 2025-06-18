import type { FastifyReply, FastifyRequest } from 'fastify';
import type { QuoteRequest } from '../schemas/quote.schema';
import QuoteService from '../services/quote.service';

export default class QuoteController {
  private _service: QuoteService;

  constructor() {
    this._service = new QuoteService();
  }

  async quoteController(
    request: FastifyRequest<{ Body: QuoteRequest }>,
    reply: FastifyReply
  ) {
    try {
      const result = await this._service.quote(request.body);
      reply.send(result);
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }
}
