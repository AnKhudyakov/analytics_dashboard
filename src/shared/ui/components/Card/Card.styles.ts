import tw from 'tailwind-styled-components';

export const Container = tw.div`
  w-full h-fit p-2 bg-secondary-dark rounded-lg
  border border-neutral-400 dark:border-secondary-1
`;

export const FlexContainer = tw(Container)`
  flex p-0
`;
