import { detect } from './detectors';
import type { EventId } from './triggers';
import type { Probability, SeasonWindow, WeatherDay } from './types';

/** Return empirical probability and Wilson CI (95 %). */
export function probability(
  event: EventId,
  weather: WeatherDay[],
  seasons: SeasonWindow[]
): Probability {
  let n = 0;
  let k = 0;

  for (const season of seasons) {
    const slice = weather.filter(
      (d) => d.date >= season.start && d.date <= season.end
    );

    if (!slice.length) {
      continue;
    }

    n++;

    if (detect(event, slice)) {
      k++;
    }
  }

  // Wilson score interval (binomial)
  if (n === 0) {
    return {
      p: 0,
      lower: 0,
      upper: 0,
    };
  }

  const z = 1.96;
  const phat = k / n;
  const denom = 1 + z ** 2 / n;
  const centre = phat + z ** 2 / (2 * n);
  const margin = z * Math.sqrt((phat * (1 - phat) + z ** 2 / (4 * n)) / n);

  return {
    p: phat,
    lower: (centre - margin) / denom,
    upper: (centre + margin) / denom,
  };
}
