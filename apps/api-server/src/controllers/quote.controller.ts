import type { FastifyReply, FastifyRequest } from 'fastify';
import type { QuoteRequest } from '../schemas/quote.schema';
import QuoteQueueService from '../services/quote-queue.service';

export default class QuoteController {
  private _queueService: QuoteQueueService;

  constructor() {
    this._queueService = new QuoteQueueService();
  }

  async quoteController(
    request: FastifyRequest<{ Body: QuoteRequest }>,
    reply: FastifyReply
  ) {
    try {
      const result = await this._queueService.enqueueQuote(request.body);
      reply.status(202).send({
        message: 'Quote request received and is being processed',
        quoteId: result.quoteId,
        status: 'pending',
      });
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }

  async getQuoteStatus(
    request: FastifyRequest<{ Params: { quoteId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { quoteId } = request.params;
      const result = await this._queueService.getQuoteStatus(quoteId);
      reply.send(result);
    } catch (err: any) {
      request.log.error(err);
      reply.status(500).send({ error: err.message });
    }
  }
}
