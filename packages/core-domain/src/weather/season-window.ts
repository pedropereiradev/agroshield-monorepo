import type { CustomSeasonGenerationPayload, SeasonWindow } from './types';

export function generateCustomSeasons({
  crop,
  yearsBack,
  plantingMonth,
  harvestMonth,
  referenceDate = new Date(),
}: CustomSeasonGenerationPayload): SeasonWindow[] {
  const today = new Date(
    Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate()
    )
  );
  const currentYear = today.getUTCFullYear();
  const seasons: SeasonWindow[] = [];

  for (let i = yearsBack; i >= 1; i--) {
    const labelYear = currentYear - i + 1;
    const startYear = plantingMonth > harvestMonth ? labelYear - 1 : labelYear;
    const endYear = labelYear;

    const start = new Date(Date.UTC(startYear, plantingMonth - 1, 1));
    const end = new Date(Date.UTC(endYear, harvestMonth, 0));

    seasons.push({
      crop,
      year: labelYear,
      start,
      end,
    });
  }

  return seasons;
}
