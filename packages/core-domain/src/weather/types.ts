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
