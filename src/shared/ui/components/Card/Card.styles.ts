import tw from 'tailwind-styled-components';

export const Container = tw.div`
  w-full h-fit p-2 bg-secordary-dark rounded-lg border border-secordary-500
`;

export const FlexContainer = tw(Container)`
  flex p-0
`;
