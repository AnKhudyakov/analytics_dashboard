import { FC } from 'react';
import { CheckboxInput } from './CheckboxInput';
import { InputProps } from './Input.def';
import {
  Container,
  EndButtonIcon,
  SearchIcon,
  StyledInput,
  StyledSearchInput,
} from './Input.styles';

export const Input: FC<InputProps> = ({
  type = 'text',
  search,
  endIcon,
  onEndIconClick,
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
        className={endIcon ? 'pr-10' : ''}
      />
      {endIcon && (
        <EndButtonIcon type="button" icon onClick={onEndIconClick}>
          {endIcon}
        </EndButtonIcon>
      )}
    </Container>
  );
};
