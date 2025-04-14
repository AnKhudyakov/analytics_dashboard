import { FC } from 'react';
import { Card } from '../Card';
import { CheckboxPopup } from './CheckboxPopup';
import { FilterPopupProps } from './FilterPopup.def';
import { Wrapper } from './FilterPopup.styles';
import { RangePopup } from './RangePopup';

export const FilterPopup: FC<FilterPopupProps> = ({ open, type, ...props }) => {

  if (!open) return null;

  return (
    <Wrapper>
      <Card className='p-0'>
        {type === 'range' && <RangePopup {...props} />}
        {type === 'checkbox' && <CheckboxPopup {...props} />}
      </Card>
    </Wrapper>
  );
};
