import { FC, InputHTMLAttributes } from 'react';
import { Icons } from 'shared/ui/icons';
import { Typography } from '../../Typography';
import {
  CustomCheckboxIcon,
  CustomCheckboxInput,
  CustomCheckboxWrapper,
} from './CheckboxInput.styles';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxInput: FC<CheckboxInputProps> = (props) => {
  return (
    <CustomCheckboxWrapper>
      <CustomCheckboxInput {...props} />
      <CustomCheckboxIcon>
        {props.checked ? (
          <Icons.checked />
        ) : (
          <Icons.unchecked className=" text-secondary-dark" />
        )}
      </CustomCheckboxIcon>
      {props.placeholder && (
        <Typography variant="body">{props.placeholder}</Typography>
      )}
    </CustomCheckboxWrapper>
  );
};
