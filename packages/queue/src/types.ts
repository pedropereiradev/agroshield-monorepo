export interface QuoteJobData {
  quoteId: string;
  requestData: {
    crop: 'soy' | 'rice';
    triggerEvent: string;
    areaHa: number;
    coveragePct: number;
    plantingMonth: number;
    harvestMonth: number;
    latitude: number;
    longitude: number;
    fieldId?: string;
  };
  timestamp: string;
}

export interface JobResult {
  success: boolean;
  data?: any;
  error?: string;
}
