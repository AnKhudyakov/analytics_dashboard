import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type Filters } from 'shared/api/types';
import { BOOLEAN_FILTER_OPTIONS } from 'shared/constants';
import { Checkbox } from 'shared/ui/Checkbox';
import { Popup } from 'shared/ui/Popup';

import { FilterRow } from '../FilterPopup.styles';
import { PopupAction } from '../PopupAction';

interface CheckboxPopupProps {
  filterKey: string;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
  label: string;
}

const readInitialValue = (filters: Filters, filterKey: string) => {
  const value = filters[filterKey]?.filterValue;
  return typeof value === 'boolean' ? value : undefined;
};

export const CheckboxPopup: FC<CheckboxPopupProps> = ({
  filterKey,
  filters,
  onFiltersChange,
  onClose,
  label,
}) => {
  const { t } = useTranslation();
  const initialValue = readInitialValue(filters, filterKey);
  const [selected, setSelected] = useState(initialValue);

  const handleApply = () => {
    if (selected !== undefined) {
      onFiltersChange({
        ...filters,
        [filterKey]: { filterType: 'checkbox', filterValue: selected },
      });
    }
    onClose();
  };

  const handleClear = () => {
    setSelected(undefined);
    onFiltersChange({ ...filters, [filterKey]: null });
    onClose();
  };

  return (
    <Popup onClose={onClose} label={label}>
      <FilterRow>
        {BOOLEAN_FILTER_OPTIONS.map(({ labelKey, value }) => (
          <Checkbox
            key={labelKey}
            label={t(labelKey)}
            checked={selected === value}
            onChange={() => setSelected(value)}
          />
        ))}
      </FilterRow>
      <PopupAction
        onApply={handleApply}
        onClear={handleClear}
        canClear={initialValue !== undefined}
        canApply={initialValue !== selected}
      />
    </Popup>
  );
};
