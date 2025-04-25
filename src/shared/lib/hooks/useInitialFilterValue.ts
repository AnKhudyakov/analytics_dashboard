import { useState } from 'react';
import { Filter, RangeValue } from 'shared/api/types';

export const useInitialRangeFilterValue = (
  filter: Filter | null,
  key: keyof RangeValue
): [
  number | undefined,
  (v: number | undefined) => void,
  number | undefined,
] => {
  const initValue = () => {
    if (!filter) return undefined;
    const filterValue = filter.filterValue;
    if (typeof filterValue === 'object') {
      return filterValue[key];
    } else return undefined;
  };

  const initialValue = initValue();

  const [value, setValue] = useState<number | undefined>(initialValue);

  return [value, setValue, initialValue];
};

export const useInitialCheckboxFilterValue = (
  filter: Filter | null
): [
  boolean | undefined,
  (v: boolean | undefined) => void,
  boolean | undefined,
] => {
  const initValue = () => {
    if (!filter) return undefined;
    const filterValue = filter.filterValue;
    if (typeof filterValue === 'boolean') {
      return filterValue;
    } else return undefined;
  };

  const initialValue = initValue();

  const [value, setValue] = useState<boolean | undefined>(initialValue);

  return [value, setValue, initialValue];
};
