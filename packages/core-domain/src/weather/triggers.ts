import type { EventId, WeatherDay } from './types';

interface TriggerSpec {
  /** Sliding-window length in days that must satisfy the predicate. */
  window: number;
  /** True = this day meets the daily rule (precip < 5 mm etc.). */
  rule: (d: WeatherDay) => boolean;
  /** Extra confirmation once window satisfied: returns true to pay. */
  postCheck?: (slice: WeatherDay[]) => boolean;
}

export const TRIGGERS: Record<EventId, TriggerSpec> = {
  soy_drought: {
    window: 20,
    rule: (d) => d.precip < 5,
    postCheck: (slice) =>
      (slice.at(-3)?.precip ?? Number.POSITIVE_INFINITY) < 5,
  },
  soy_flood: {
    window: 5,
    rule: () => false,
  },
  soy_heat: {
    window: 3,
    rule: (d) => d.tMax > 40,
  },
  soy_cold: {
    window: 3,
    rule: (d) => d.tMin < 15 && d.windMax > 15,
  },
  rice_drought: {
    window: 10,
    rule: (d) => d.precip < 2,
    postCheck: (slice) => slice.some((x) => x.tMax > 35),
  },
  rice_flood: {
    window: 3,
    rule: () => false,
  },
  rice_heat: {
    window: 3,
    rule: (d) => d.tMax > 35,
    postCheck: (slice) => {
      const amp =
        Math.max(...slice.map((s) => s.tMax)) -
        Math.min(...slice.map((s) => s.tMin));
      return amp < 8;
    },
  },
  rice_cold: {
    window: 4,
    rule: (d) => d.tMin < 16,
  },
};
