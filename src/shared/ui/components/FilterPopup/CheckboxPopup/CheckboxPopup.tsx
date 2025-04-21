import { FC, useRef } from 'react';
import { Filters } from 'shared/api/types';
import { BOOLEAN_FILTER_OPTIONS } from 'shared/constants/filters';
import { useInitialCheckboxFilterValue } from 'shared/lib/hooks/useInitialFilterValue';
import { useOutsideClick } from 'shared/lib/hooks/useOutsideClick';
import { Button } from 'shared/ui/components/Button';
import { Input } from 'shared/ui/components/Input';
import { hoverEffect } from 'shared/ui/effects';
import { CheckboxPopupProps } from './CheckboxPopup.def';
import { Container, FilterRow, Footer } from './CheckboxPopup.styles';

export const CheckboxPopup: FC<CheckboxPopupProps> = ({
  filterKey,
  filters,
  onFilter,
  onClose,
}) => {
  const popupRef = useRef<HTMLElement>(null);

  const [selected, setSelected] = useInitialCheckboxFilterValue(
    filters?.[filterKey]
  );

  const handleApply = () => {
    onFilter({
      ...filters,
      [filterKey]: {
        filterType: 'checkbox' as keyof Filters['filterType'],
        filterValue: selected,
      },
    });
    onClose();
  };

  const handleClear = () => {
    setSelected(false);
    onFilter({ ...filters, [filterKey]: null });
    onClose();
  };

  useOutsideClick(popupRef, onClose);

  return (
    <Container ref={popupRef}>
      <FilterRow>
        {BOOLEAN_FILTER_OPTIONS.map(({ label, value }) => (
          <Input
            key={label}
            type="checkbox"
            placeholder={label}
            checked={value === selected ? true : false}
            onChange={() => setSelected(value)}
          />
        ))}
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
