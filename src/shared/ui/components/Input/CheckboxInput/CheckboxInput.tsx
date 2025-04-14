import { FC, InputHTMLAttributes } from 'react';
import { Icons } from 'shared/ui/icons';
import {
  CustomCheckboxIcon,
  CustomCheckboxInput,
  CustomCheckboxWrapper,
} from './CheckboxInput.styles';

interface ICheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxInput: FC<ICheckboxInputProps> = (props) => {
  return (
    <CustomCheckboxWrapper>
      <CustomCheckboxInput type="checkbox" {...props} />
      <CustomCheckboxIcon>
        {props.checked ? <Icons.checked /> : <Icons.unchecked />}
      </CustomCheckboxIcon>
      {props.placeholder && <span>{props.placeholder}</span>}
    </CustomCheckboxWrapper>
  );
};
