import {
  type Job,
  type JobResult,
  type QuoteJobData,
  QuoteWorker,
} from '@agroshield/queue';
import { QuoteProcessor } from './processors/quote.processor';

async function startWorker() {
  console.log('Starting AgroShield Quote Worker...');

  const quoteProcessor = new QuoteProcessor();

  const worker = new QuoteWorker(
    async (job: Job<QuoteJobData>): Promise<JobResult> => {
      try {
        console.log(
          `Processing quote job ${job.id} for quote ${job.data.quoteId}`
        );

        // Update job progress
        await job.updateProgress(10);

        const result = await quoteProcessor.processQuote(job.data, job);

        await job.updateProgress(100);

        return {
          success: true,
          data: result,
        };
      } catch (error) {
        console.error(`Quote processing failed for job ${job.id}:`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }
  );

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Received SIGINT, shutting down gracefully...');
    await worker.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    await worker.close();
    process.exit(0);
  });

  console.log('Quote Worker started successfully');
}

startWorker().catch((error) => {
  console.error('Failed to start worker:', error);
  process.exit(1);
});
