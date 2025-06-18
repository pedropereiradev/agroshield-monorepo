// Event types available for quotes
export type EventId =
  | 'soy_drought'
  | 'soy_flood'
  | 'soy_heat'
  | 'soy_cold'
  | 'rice_drought'
  | 'rice_flood'
  | 'rice_heat'
  | 'rice_cold';

// Request format for quote calculation
export interface QuoteRequest {
  crop: 'soy' | 'rice';
  triggerEvent: EventId;
  areaHa: number;
  coveragePct: number;
  plantingMonth: number;
  harvestMonth: number;
  latitude: number;
  longitude: number;
  fieldId?: string; // Optional parameter
}

// Response format from quote API
export interface QuoteResponse {
  probability: number;
  lower: number;
  upper: number;
  LMI: number;
  premium: number;
}
