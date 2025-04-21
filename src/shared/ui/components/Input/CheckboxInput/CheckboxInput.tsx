import { FC, InputHTMLAttributes } from 'react';
import { Icons } from 'shared/ui/icons';
import {
  CustomCheckboxIcon,
  CustomCheckboxInput,
  CustomCheckboxWrapper,
} from './CheckboxInput.styles';
import { Typography } from '../../Typography';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxInput: FC<CheckboxInputProps> = (props) => {

  return (
    <CustomCheckboxWrapper>
      <CustomCheckboxInput {...props} />
      <CustomCheckboxIcon>
        {props.checked ? <Icons.checked /> : <Icons.unchecked />}
      </CustomCheckboxIcon>
      {props.placeholder && <Typography variant='body'>{props.placeholder}</Typography>}
    </CustomCheckboxWrapper>
  );
};
