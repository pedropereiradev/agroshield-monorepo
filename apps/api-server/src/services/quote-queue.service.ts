import { randomUUID } from 'node:crypto';
import { quoteQueue } from '@agroshield/queue';
import type { QuoteJobData } from '@agroshield/queue';
import type { QuoteRequest } from '../schemas/quote.schema';

export default class QuoteQueueService {
  async enqueueQuote(requestData: QuoteRequest): Promise<{ quoteId: string }> {
    const quoteId = randomUUID();

    const jobData: QuoteJobData = {
      quoteId,
      requestData,
      timestamp: new Date().toISOString(),
    };

    await quoteQueue.add('process-quote', jobData, {
      jobId: quoteId,
      removeOnComplete: 100,
      removeOnFail: 50,
    });

    return { quoteId };
  }

  async getQuoteStatus(quoteId: string) {
    const job = await quoteQueue.getJob(quoteId);

    if (!job) {
      return { status: 'not_found' };
    }

    const state = await job.getState();

    switch (state) {
      case 'waiting':
      case 'delayed':
        return { status: 'pending', progress: 0 };
      case 'active':
        return { status: 'processing', progress: job.progress };
      case 'completed':
        return { status: 'completed', result: job.returnvalue };
      case 'failed':
        return { status: 'failed', error: job.failedReason };
      default:
        return { status: 'unknown' };
    }
  }
}
