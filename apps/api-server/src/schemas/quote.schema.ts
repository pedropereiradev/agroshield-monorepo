import type { EventId } from '@agroshield/core-domain';

export interface QuoteRequest {
  crop: 'soy' | 'rice';
  triggerEvent: EventId;
  areaHa: number;
  coveragePct: number;
  plantingMonth: number;
  harvestMonth: number;
  latitude: number;
  longitude: number;
}

export interface QuoteResponse {
  probability: number;
  lower: number;
  upper: number;
  LMI: number;
  premium: number;
}

export const QuoteRequestSchema = {
  type: 'object',
  required: [
    'crop',
    'triggerEvent',
    'areaHa',
    'coveragePct',
    'plantingMonth',
    'harvestMonth',
    'latitude',
    'longitude',
  ],
  properties: {
    fieldId: { type: 'string' },
    crop: { type: 'string', enum: ['soy', 'rice'] },
    triggerEvent: {
      type: 'string',
      enum: [
        'soy_drought',
        'soy_flood',
        'soy_heat',
        'soy_cold',
        'rice_drought',
        'rice_flood',
        'rice_heat',
        'rice_cold',
      ],
    },
    areaHa: { type: 'number', minimum: 0 },
    coveragePct: { type: 'number', minimum: 0, maximum: 1 },
    plantingMonth: { type: 'integer', minimum: 1, maximum: 12 },
    harvestMonth: { type: 'integer', minimum: 1, maximum: 12 },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
  },
} as const;

export const QuoteResponseSchema = {
  type: 'object',
  properties: {
    probability: { type: 'number' },
    lower: { type: 'number' },
    upper: { type: 'number' },
    LMI: { type: 'number' },
    premium: { type: 'number' },
  },
} as const;
