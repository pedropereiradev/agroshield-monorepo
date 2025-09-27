import { type Job, Worker } from 'bullmq';
import { queueConfig } from './config';
import { QUEUE_NAMES } from './queues';
import type { JobResult, QuoteJobData } from './types';

export type JobProcessor<T = any, R = any> = (job: Job<T>) => Promise<R>;

export class QuoteWorker {
  private worker: Worker;

  constructor(processor: JobProcessor<QuoteJobData, JobResult>) {
    this.worker = new Worker(
      QUEUE_NAMES.QUOTE_PROCESSING,
      async (job: Job<QuoteJobData>) => {
        try {
          job.log(`Processing quote request: ${job.data.quoteId}`);
          const result = await processor(job);
          job.log(`Quote processing completed: ${job.data.quoteId}`);
          return result;
        } catch (error) {
          job.log(`Quote processing failed: ${job.data.quoteId} - ${error}`);
          throw error;
        }
      },
      {
        connection: queueConfig.redis,
        concurrency: 5,
      }
    );

    this.worker.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });

    this.worker.on('error', (err) => {
      console.error('Worker error:', err);
    });
  }

  async close() {
    await this.worker.close();
  }

  getWorker() {
    return this.worker;
  }
}
