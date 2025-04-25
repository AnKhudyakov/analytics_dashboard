import tw from 'tailwind-styled-components';

export const Container = tw.div`
  mx-auto p-6 w-full min-h-screen h-fit bg-neutral-800 overflow-auto flex flex-col gap-6
`;

export const ContainerSkeleton = tw(Container)`
  -mt-1
`;
