import tw from 'tailwind-styled-components';

export const Container = tw.div`
  mx-auto w-full overflow-auto p-2
`;

export const FlexContainer = tw(Container)`
  flex justify-between overflow-visible
`;

export const Divider = tw.div`
h-full w-0.25 bg-secondary-1
`;
