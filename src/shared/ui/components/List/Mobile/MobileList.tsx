import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { MobileListProps } from './MobileList.def';
import { Container, Swipeable } from './MobileList.styles';
import { MobileListBody } from './MobileListBody/MobileListBody';
import { MobileListHeader } from './MobileListHeader/MobileListHeader';

export const MobileList: FC<MobileListProps> = ({
  data,
  isLoading,
  error,
  onError,
  emptyText,
  viewPath,
  ...props
}) => {
  const cols = data.items;
  const [activeIndex, setActiveIndex] = useState(1); // default 2 column

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex((prev) => {
        const next = prev - 1;
        return next <= 0 ? cols.length - 1 : next; // skip 1 column
      }),
    onSwipedRight: () =>
      setActiveIndex((prev) => {
        const next = (prev + 1) % cols.length;
        return next === 0 ? 1 : next; // skip 1 column
      }),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Container>
      <MobileListHeader
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        cols={cols}
        {...props}
      />

      <Swipeable {...swipeHandlers}>
        <MobileListBody
          isLoading={isLoading}
          error={error}
          onError={onError}
          activeIndex={activeIndex}
          data={data}
          emptyText={emptyText}
          viewPath={viewPath}
          onFilter={props.onFilter}
        />
      </Swipeable>
    </Container>
  );
};
