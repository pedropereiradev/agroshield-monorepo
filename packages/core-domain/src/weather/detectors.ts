import { TRIGGERS } from './triggers';
import type { EventId, WeatherDay } from './types';

/** True if event E happened inside the supplied window (dates inclusive). */
export function detect(event: EventId, days: WeatherDay[]): boolean {
  const { window, rule, postCheck } = TRIGGERS[event];

  if (['soy_flood', 'rice_flood'].includes(event)) {
    // rolling 5-day / 3-day precip SUM variant
    const len = event === 'soy_flood' ? 5 : 3;

    for (let i = 0; i <= days.length - len; i++) {
      const slice = days.slice(i, i + len);
      const sum = slice.reduce((acc, d) => acc + d.precip, 0);

      if (
        (event === 'soy_flood' && sum > 150) ||
        (event === 'rice_flood' && sum > 120)
      ) {
        return true;
      }
    }

    return false;
  }

  // generic “consecutive-days” detector
  let streak: WeatherDay[] = [];

  for (const day of days) {
    if (rule(day)) {
      streak.push(day);

      if (
        streak.length >= window &&
        (!postCheck || postCheck(streak.slice(-window)))
      ) {
        return true;
      }
    } else {
      streak = [];
    }
  }
  return false;
}
