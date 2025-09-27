import { Queue } from 'bullmq';
import { queueConfig } from './config';

export const QUEUE_NAMES = {
  QUOTE_PROCESSING: 'quote-processing',
} as const;

export type QueueName = keyof typeof QUEUE_NAMES;

export const quoteQueue = new Queue(QUEUE_NAMES.QUOTE_PROCESSING, {
  connection: queueConfig.redis,
  defaultJobOptions: queueConfig.defaultJobOptions,
});

export const queues = {
  [QUEUE_NAMES.QUOTE_PROCESSING]: quoteQueue,
} as const;
