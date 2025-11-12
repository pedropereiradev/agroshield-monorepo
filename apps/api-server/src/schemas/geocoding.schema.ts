export interface GeocodingRequest {
  query: string;
  limit?: number;
}

export interface CityResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  admin1?: string;
  admin2?: string;
  population?: number;
}

export interface GeocodingResponse {
  results: CityResult[];
}

export const GeocodingRequestSchema = {
  type: 'object',
  required: ['query'],
  properties: {
    query: { type: 'string', minLength: 2 },
    limit: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
  },
} as const;

export const GeocodingResponseSchema = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          country: { type: 'string' },
          countryCode: { type: 'string' },
          admin1: { type: 'string' },
          admin2: { type: 'string' },
          population: { type: 'integer' },
        },
      },
    },
  },
} as const;
