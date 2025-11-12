export interface WeatherRequest {
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  timestamp: string;
}

export interface ForecastRequest {
  latitude: number;
  longitude: number;
  days?: number;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  weatherCode: number;
}

export interface ForecastResponse {
  forecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  precipitation: number;
  weatherCode: number;
}

export interface HourlyForecastResponse {
  hourly: HourlyForecast[];
}

export const WeatherRequestSchema = {
  type: 'object',
  required: ['latitude', 'longitude'],
  properties: {
    latitude: { type: 'number', minimum: -90, maximum: 90 },
    longitude: { type: 'number', minimum: -180, maximum: 180 },
  },
} as const;

export const WeatherResponseSchema = {
  type: 'object',
  properties: {
    temperature: { type: 'number' },
    precipitation: { type: 'number' },
    windSpeed: { type: 'number' },
    weatherCode: { type: 'integer' },
    humidity: { type: 'number' },
    timestamp: { type: 'string' },
  },
} as const;

export const ForecastRequestSchema = {
  type: 'object',
  required: ['latitude', 'longitude'],
  properties: {
    latitude: { type: 'number', minimum: -90, maximum: 90 },
    longitude: { type: 'number', minimum: -180, maximum: 180 },
    days: { type: 'integer', minimum: 1, maximum: 16, default: 14 },
  },
} as const;

export const ForecastResponseSchema = {
  type: 'object',
  properties: {
    forecast: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string' },
          temperatureMax: { type: 'number' },
          temperatureMin: { type: 'number' },
          precipitation: { type: 'number' },
          weatherCode: { type: 'integer' },
        },
      },
    },
  },
} as const;

export const HourlyForecastResponseSchema = {
  type: 'object',
  properties: {
    hourly: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          time: { type: 'string' },
          temperature: { type: 'number' },
          precipitation: { type: 'number' },
          weatherCode: { type: 'integer' },
        },
      },
    },
  },
} as const;
