import { describe, expect, it } from 'vitest';

import { compactNumber, lastValueOf, trendOf } from './numbers';

describe('compactNumber', () => {
  it.each([
    [999, '999'],
    [1000, '1K'],
    [1500, '1.5K'],
    [2_400_000, '2.4M'],
    [3_100_000_000, '3.1B'],
    [0, '0'],
    [-2500, '-2.5K'],
  ])('formats %i as %s', (input, expected) => {
    expect(compactNumber(input)).toBe(expected);
  });

  it('returns an empty string for missing values', () => {
    expect(compactNumber(undefined)).toBe('');
    expect(compactNumber(null)).toBe('');
    expect(compactNumber(Number.NaN)).toBe('');
  });
});

describe('lastValueOf', () => {
  it('formats the last entry of the series', () => {
    const data = [{ viewCount: 10 }, { viewCount: 2500 }];
    expect(lastValueOf(data, 'viewCount')).toBe('2.5K');
  });

  it('reports missing data for an empty series', () => {
    expect(lastValueOf([], 'viewCount')).toBe('No data');
  });
});

describe('trendOf', () => {
  it('computes a positive trend', () => {
    const data = [{ viewCount: 100 }, { viewCount: 150 }];
    expect(trendOf(data, 'viewCount')).toEqual({
      value: '50',
      isPositive: true,
    });
  });

  it('computes a negative trend as an absolute percentage', () => {
    const data = [{ viewCount: 200 }, { viewCount: 150 }];
    expect(trendOf(data, 'viewCount')).toEqual({
      value: '25',
      isPositive: false,
    });
  });

  it('treats an unchanged metric as positive', () => {
    const data = [{ viewCount: 200 }, { viewCount: 200 }];
    expect(trendOf(data, 'viewCount')).toEqual({
      value: '0',
      isPositive: true,
    });
  });

  it('falls back to a neutral trend without a comparable baseline', () => {
    expect(trendOf([{ viewCount: 5 }], 'viewCount')).toEqual({
      value: '0',
      isPositive: true,
    });
    expect(trendOf([{ viewCount: 0 }, { viewCount: 5 }], 'viewCount')).toEqual({
      value: '0',
      isPositive: true,
    });
  });
});
