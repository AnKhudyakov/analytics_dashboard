import { FC } from 'react';
import { InputProps } from './Input.def';
import {
  Container,
  SearchIcon,
  StyledInput,
  StyledSearchInput,
} from './Input.styles';
import { CheckboxInput } from './CheckboxInput';

export const Input: FC<InputProps> = ({
  type = 'text',
  search,
  placeholder = 'Search for...',
  ...props
}) => {
  const Tag = search
    ? StyledSearchInput
    : type === 'checkbox'
      ? CheckboxInput
      : StyledInput;

  return (
    <Container>
      {search && <SearchIcon width={16} height={15} />}
      <Tag
        {...props}
        type={type}
        placeholder={placeholder}
      />
    </Container>
  );
};
