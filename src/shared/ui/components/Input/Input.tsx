import { FC } from 'react';
import { InputProps } from './Input.def';
import { Container, SearchIcon, StyledInput } from './Input.styles';

export const Input: FC<InputProps> = ({
  type = 'text',
  search,
  placeholder = 'Search for...',
  ...props
}) => {
  return (
    <Container>
      {search && <SearchIcon width={16} height={15} />}
      <StyledInput {...props} type={type} placeholder={placeholder} />
    </Container>
  );
};
