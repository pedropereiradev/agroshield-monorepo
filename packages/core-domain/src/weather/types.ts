export type EventId =
  | 'soy_drought'
  | 'soy_flood'
  | 'soy_heat'
  | 'soy_cold'
  | 'rice_drought'
  | 'rice_flood'
  | 'rice_heat'
  | 'rice_cold';

export interface WeatherDay {
  date: Date;
  precip: number;
  tMax: number;
  tMin: number;
  windMax: number;
}

export interface SeasonWindow {
  crop: 'soy' | 'rice';
  year: number;
  start: Date;
  end: Date;
}

export interface Probability {
  p: number;
  lower: number;
  upper: number;
}

export interface CustomSeasonGenerationPayload {
  crop: 'soy' | 'rice';
  yearsBack: number;
  plantingMonth: number;
  harvestMonth: number;
  referenceDate?: Date;
}
