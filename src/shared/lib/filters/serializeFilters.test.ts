import { describe, expect, it } from 'vitest';

import { type Filters } from 'shared/api/types';

import {
  countActiveFilters,
  deserializeFilters,
  serializeFilters,
} from './serializeFilters';

describe('serializeFilters', () => {
  it('round-trips a filter set', () => {
    const filters: Filters = {
      viewCount: {
        filterType: 'range',
        filterValue: { valueFrom: 10, valueTo: 20 },
      },
      hiddenSubscriberCount: { filterType: 'checkbox', filterValue: true },
    };

    expect(deserializeFilters(serializeFilters(filters))).toEqual(filters);
  });

  it('survives non-latin1 characters', () => {
    const filters: Filters = {
      'название-канала': { filterType: 'checkbox', filterValue: false },
    };

    expect(() => serializeFilters(filters)).not.toThrow();
    expect(deserializeFilters(serializeFilters(filters))).toEqual(filters);
  });

  it('returns an empty set for missing or malformed input', () => {
    expect(deserializeFilters(null)).toEqual({});
    expect(deserializeFilters('')).toEqual({});
    expect(deserializeFilters('not-base64!!')).toEqual({});
  });
});

describe('countActiveFilters', () => {
  it('ignores cleared filters', () => {
    expect(
      countActiveFilters({
        viewCount: { filterType: 'range', filterValue: { valueFrom: 1 } },
        videoCount: null,
      })
    ).toBe(1);
  });
});
