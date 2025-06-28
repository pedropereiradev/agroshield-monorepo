export const CURRENCY_DECIMALS = 6;
export const CURRENCY_MULTIPLIER = 10 ** CURRENCY_DECIMALS;
export const CURRENCY_SYMBOL = 'USDC';

/**
 * Convert a display value (e.g., 120.50) to micro-units for storage
 * @param displayValue - The value as shown to users (e.g., 120.50 USDC)
 * @returns The value in micro-units (e.g., 120500000)
 */
export function toMicroUnits(displayValue: number): number {
  return Math.floor(displayValue * CURRENCY_MULTIPLIER);
}

/**
 * Convert micro-units from storage to display value
 * @param microUnits - The value stored in micro-units (e.g., 120500000)
 * @returns The display value (e.g., 120.50)
 */
export function fromMicroUnits(microUnits: number): number {
  return microUnits / CURRENCY_MULTIPLIER;
}

/**
 * Format a display value as currency string
 * @param displayValue - The value as a number (e.g., 120.50)
 * @param decimals - Number of decimal places to show (default: 2 for currency display)
 * @returns Formatted string (e.g., "120.50 USDC")
 */
export function formatCurrency(displayValue: number, decimals = 2): string {
  return `${displayValue.toFixed(decimals)} ${CURRENCY_SYMBOL}`;
}

/**
 * Format micro-units directly to currency string
 * @param microUnits - The value in micro-units
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string (e.g., "120.50 USDC")
 */
export function formatMicroUnits(microUnits: number, decimals = 2): string {
  const displayValue = fromMicroUnits(microUnits);
  return formatCurrency(displayValue, decimals);
}
