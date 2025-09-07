import { detect } from './detectors';
import type { EventId, Probability, SeasonWindow, WeatherDay } from './types';

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

  if (n === 0) {
    return {
      p: 0.03,
      lower: 0.005,
      upper: 0.02,
    };
  }

  const z = 1.96;
  const phat = k / n;
  const denom = 1 + z ** 2 / n;
  const centre = phat + z ** 2 / (2 * n);
  const margin = z * Math.sqrt((phat * (1 - phat) + z ** 2 / (4 * n)) / n);

  const calculatedP = phat;
  const calculatedLower = (centre - margin) / denom;
  const calculatedUpper = (centre + margin) / denom;

  const minProbability = 0.03;

  return {
    p: Math.round(Math.max(calculatedP, minProbability) * 100) / 100,
    lower: Math.round(Math.max(calculatedLower, 0.005) * 100) / 100,
    upper: Math.round(Math.max(calculatedUpper, 0.02) * 100) / 100,
  };
}
