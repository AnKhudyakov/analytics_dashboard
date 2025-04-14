import { ChangeEvent, FC, useRef } from 'react';
import { Filters } from 'shared/api/types';
import { useInitialRangeFilterValue } from 'shared/lib/hooks/useInitialFilterValue';
import { useOutsideClick } from 'shared/lib/hooks/useOutsideClick';
import { Button } from 'shared/ui/components/Button';
import { Input } from 'shared/ui/components/Input';
import { hoverEffect } from 'shared/ui/effects';
import { RangePopupProps } from './RangePopup.def';
import { Container, FilterRow, Footer, Label } from './RangePopup.styles';

export const RangePopup: FC<RangePopupProps> = ({
  filterKey,
  filters,
  onFilter,
  onClose,
}) => {
  const popupRef = useRef<HTMLElement>(null);

  const [valueFrom, setValueFrom] = useInitialRangeFilterValue(
    filters[filterKey],
    'valueFrom'
  );
  const [valueTo, setValueTo] = useInitialRangeFilterValue(
    filters[filterKey],
    'valueTo'
  );

  const handleChange =
    (setter: (v: number | undefined) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      setter(Number(num) || undefined);
    };

  const handleApply = () => {
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
  };

  const handleClear = () => {
    onFilter({ ...filters, [filterKey]: null });
    setValueFrom(undefined);
    setValueTo(undefined);
    onClose();
  };

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

  useOutsideClick(popupRef, onClose);

  return (
    <Container ref={popupRef}>
      <FilterRow>
        <Label>From</Label>
        <Input
          type="number"
          placeholder="Min"
          value={valueFrom}
          onChange={handleChange(setValueFrom)}
          onBlur={handleValidateFrom}
        />
        <Label>To</Label>
        <Input
          type="number"
          placeholder="Max"
          value={valueTo}
          onChange={handleChange(setValueTo)}
          onBlur={handleValidateTo}
        />
      </FilterRow>
      <Footer>
        <Button className={hoverEffect} onClick={handleApply}>
          Apply
        </Button>
        <Button className={hoverEffect} onClick={handleClear}>
          Clear
        </Button>
      </Footer>
    </Container>
  );
};
