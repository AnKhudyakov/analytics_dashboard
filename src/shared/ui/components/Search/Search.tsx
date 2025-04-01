import { ChangeEvent, FC } from 'react';
import { SearchProps } from './Search.def';
import { Container, Input, SearchIcon } from './Search.styles';

export const Search: FC<SearchProps> = ({
  placeholder = 'Search for...',
  onChange,
}) => {
  return (
    <Container>
      <SearchIcon width={16} height={15} />
      <Input type="text" placeholder={placeholder} onChange={onChange} />
    </Container>
  );
};
