/**
 * Returns a time window of the last n years.
 * @param years
 * @returns An object with startDate and endDate properties.
 */
export function getTimeWindow(years: number) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const endDate = weekAgo.toISOString().split('T')[0];

  const currentYear = weekAgo.getFullYear();
  const startYear = currentYear - years;
  const startDate = `${startYear}-01-01`;

  return {
    startDate,
    endDate,
  };
}
