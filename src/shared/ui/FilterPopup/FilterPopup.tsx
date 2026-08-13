import { type FC } from 'react';

import { type Filters } from 'shared/api/types';

import { CheckboxPopup } from './CheckboxPopup';
import { Wrapper } from './FilterPopup.styles';
import { RangePopup } from './RangePopup';

export interface FilterPopupProps {
  type: 'range' | 'checkbox';
  filterKey: string;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
  label: string;
}

export const FilterPopup: FC<FilterPopupProps> = ({ type, ...props }) => (
  <Wrapper>
    {type === 'range' ? (
      <RangePopup {...props} />
    ) : (
      <CheckboxPopup {...props} />
    )}
  </Wrapper>
);
