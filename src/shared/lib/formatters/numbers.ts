const NO_DATA = 'No data';

export const compactNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${round(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${round(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${round(value / 1_000)}K`;
  return String(value);
};

const round = (value: number) => parseFloat(value.toFixed(1));

export const lastValueOf = <T, K extends keyof T>(
  data: readonly T[],
  field: K
): string => {
  const last = data.at(-1);
  if (!last) return NO_DATA;
  return compactNumber(Number(last[field]));
};

export interface Trend {
  value: string;
  isPositive: boolean;
}

const NEUTRAL_TREND: Trend = { value: '0', isPositive: true };

export const trendOf = <T, K extends keyof T>(
  data: readonly T[],
  field: K
): Trend => {
  const previous = data.at(-2);
  const current = data.at(-1);
  if (!previous || !current) return NEUTRAL_TREND;

  const previousValue = Number(previous[field]);
  const currentValue = Number(current[field]);
  if (
    !previousValue ||
    Number.isNaN(previousValue) ||
    Number.isNaN(currentValue)
  ) {
    return NEUTRAL_TREND;
  }

  const delta = ((currentValue - previousValue) / previousValue) * 100;

  return {
    value: String(parseFloat(Math.abs(delta).toFixed(1))),
    isPositive: delta >= 0,
  };
};
