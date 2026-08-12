import { type ChangeEvent, type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type Filters, type RangeValue } from 'shared/api/types';
import { Input } from 'shared/ui/Input';
import { Popup } from 'shared/ui/Popup';

import { FilterRow } from '../FilterPopup.styles';
import { PopupAction } from '../PopupAction';

interface RangePopupProps {
  filterKey: string;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClose: () => void;
  label: string;
}

const readInitialRange = (filters: Filters, filterKey: string): RangeValue => {
  const value = filters[filterKey]?.filterValue;
  return typeof value === 'object' && value !== null ? value : {};
};

const parseBound = (event: ChangeEvent<HTMLInputElement>) => {
  const parsed = Number(event.target.value);
  return event.target.value === '' || Number.isNaN(parsed)
    ? undefined
    : Math.max(0, parsed);
};

export const RangePopup: FC<RangePopupProps> = ({
  filterKey,
  filters,
  onFiltersChange,
  onClose,
  label,
}) => {
  const { t } = useTranslation();
  const initialRange = readInitialRange(filters, filterKey);
  const [range, setRange] = useState<RangeValue>(initialRange);

  const isDirty =
    range.valueFrom !== initialRange.valueFrom ||
    range.valueTo !== initialRange.valueTo;
  const hasBounds =
    range.valueFrom !== undefined || range.valueTo !== undefined;
  const isInvalid =
    range.valueFrom !== undefined &&
    range.valueTo !== undefined &&
    range.valueFrom > range.valueTo;

  const handleApply = () => {
    if (hasBounds && !isInvalid) {
      onFiltersChange({
        ...filters,
        [filterKey]: { filterType: 'range', filterValue: range },
      });
    }
    onClose();
  };

  const handleClear = () => {
    setRange({});
    onFiltersChange({ ...filters, [filterKey]: null });
    onClose();
  };

  return (
    <Popup onClose={onClose} label={label}>
      <FilterRow>
        <Input
          type="number"
          min={0}
          hideLabel={false}
          label={t('shared.from')}
          value={range.valueFrom ?? ''}
          error={isInvalid ? t('shared.invalidRange') : undefined}
          onChange={(event) =>
            setRange((prev) => ({ ...prev, valueFrom: parseBound(event) }))
          }
        />
        <Input
          type="number"
          min={0}
          hideLabel={false}
          label={t('shared.to')}
          value={range.valueTo ?? ''}
          onChange={(event) =>
            setRange((prev) => ({ ...prev, valueTo: parseBound(event) }))
          }
        />
      </FilterRow>
      <PopupAction
        onApply={handleApply}
        onClear={handleClear}
        canClear={
          initialRange.valueFrom !== undefined ||
          initialRange.valueTo !== undefined
        }
        canApply={isDirty && !isInvalid}
      />
    </Popup>
  );
};
