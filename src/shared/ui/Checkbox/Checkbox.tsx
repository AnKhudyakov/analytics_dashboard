import { type ComponentPropsWithRef } from 'react';

import { Icons } from 'shared/ui/icons';
import { Typography } from 'shared/ui/Typography';

import {
  CheckboxIcon,
  CheckboxWrapper,
  HiddenCheckbox,
} from './Checkbox.styles';

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
}

export const Checkbox = ({ label, checked, ...props }: CheckboxProps) => (
  <CheckboxWrapper>
    <HiddenCheckbox {...props} type="checkbox" checked={checked} />
    <CheckboxIcon aria-hidden>
      {checked ? (
        <Icons.checked className="text-secondary-4" />
      ) : (
        <Icons.unchecked className="text-secondary-1" />
      )}
    </CheckboxIcon>
    <Typography variant="body">{label}</Typography>
  </CheckboxWrapper>
);
