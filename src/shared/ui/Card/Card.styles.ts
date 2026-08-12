import tw from 'tailwind-styled-components';

export const Container = tw.div`h-fit w-full rounded-lg border border-neutral-400 bg-secondary p-2 dark:border-secondary-1`;

export const FlexContainer = tw(Container)`
  flex p-0
`;
