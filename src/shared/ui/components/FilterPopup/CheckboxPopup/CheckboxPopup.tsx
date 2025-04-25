import { FC } from 'react';
import { Filters } from 'shared/api/types';
import { BOOLEAN_FILTER_OPTIONS } from 'shared/constants';
import { useInitialCheckboxFilterValue } from 'shared/lib/hooks/useInitialFilterValue';
import { Input } from 'shared/ui/components/Input';
import { Popup } from 'shared/ui/components/Popup';
import { PopupAction } from '../PopupAction';
import { CheckboxPopupProps } from './CheckboxPopup.def';
import { FilterRow } from './CheckboxPopup.styles';

export const CheckboxPopup: FC<CheckboxPopupProps> = ({
  filterKey,
  filters,
  onFilter,
  onClose,
}) => {
  const [selected, setSelected, initialValue] = useInitialCheckboxFilterValue(
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

  return (
    <Popup onClose={onClose}>
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
      <PopupAction
        onApply={handleApply}
        onClear={handleClear}
        hasFilter={initialValue !== undefined}
        hasApply={Boolean(initialValue !== selected)}
      />
    </Popup>
  );
};
