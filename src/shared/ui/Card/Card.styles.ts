import tw from 'tailwind-styled-components';

export const Container = tw.div`glass-panel h-fit w-full rounded-2xl p-2`;

export const FlexContainer = tw(Container)`
  flex p-0
`;
