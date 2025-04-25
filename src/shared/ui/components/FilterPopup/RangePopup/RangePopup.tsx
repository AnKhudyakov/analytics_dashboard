import { ChangeEvent, FC, useCallback } from 'react';
import { Filters } from 'shared/api/types';
import { useInitialRangeFilterValue } from 'shared/lib/hooks/useInitialFilterValue';
import { Input } from 'shared/ui/components/Input';
import { Popup } from 'shared/ui/components/Popup';
import { PopupAction } from '../PopupAction';
import { RangePopupProps } from './RangePopup.def';
import { FilterRow, Label } from './RangePopup.styles';
import { useTranslation } from 'react-i18next';

export const RangePopup: FC<RangePopupProps> = ({
  filterKey,
  filters,
  onFilter,
  onClose,
}) => {
  const { t } = useTranslation();
  const [valueFrom, setValueFrom, initialValueFrom] =
    useInitialRangeFilterValue(filters?.[filterKey], 'valueFrom');
  const [valueTo, setValueTo, initialValueTo] = useInitialRangeFilterValue(
    filters?.[filterKey],
    'valueTo'
  );

  const handleChange =
    (setter: (v: number | undefined) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      setter(Number(num) || undefined);
    };

  const handleApply = useCallback(() => {
    if (valueTo || valueFrom) {
      onFilter({
        ...filters,
        [filterKey]: {
          filterType: 'range' as keyof Filters['filterType'],
          filterValue: { valueFrom, valueTo },
        },
      });
    }
    onClose();
  }, [valueTo, valueFrom, filters, filterKey]);

  const handleClear = useCallback(() => {
    onFilter({ ...filters, [filterKey]: null });
    setValueFrom(undefined);
    setValueTo(undefined);
    onClose();
  }, [filters, filterKey]);

  const handleValidateFrom = () => {
    if (valueFrom !== undefined) {
      if (valueFrom < 0) {
        setValueFrom(0);
        return;
      }
      if (valueTo !== undefined && valueFrom > valueTo) {
        setValueFrom(valueTo);
      }
    }
  };

  const handleValidateTo = () => {
    if (valueTo !== undefined) {
      if (valueTo < 0) {
        setValueTo(0);
        return;
      }
      if (valueFrom !== undefined && valueTo < valueFrom) {
        setValueTo(valueFrom);
      }
    }
  };

  return (
    <Popup onClose={onClose}>
      <FilterRow>
        <Label>{t('shared.from')}</Label>
        <Input
          type="number"
          placeholder="Min"
          value={valueFrom}
          onChange={handleChange(setValueFrom)}
          onBlur={handleValidateFrom}
        />
        <Label>{t('shared.to')}</Label>
        <Input
          type="number"
          placeholder="Max"
          value={valueTo}
          onChange={handleChange(setValueTo)}
          onBlur={handleValidateTo}
        />
      </FilterRow>
      <PopupAction
        onApply={handleApply}
        onClear={handleClear}
        hasFilter={Boolean(initialValueFrom || initialValueTo)}
        hasApply={Boolean(
          initialValueFrom !== valueFrom || initialValueTo !== valueTo
        )}
      />
    </Popup>
  );
};
