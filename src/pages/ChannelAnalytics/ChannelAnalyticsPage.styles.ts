import Skeleton from 'react-loading-skeleton';
import tw from 'tailwind-styled-components';

export const Container = tw.div`
  mx-auto p-6 w-full min-h-screen overflow-auto flex flex-col gap-6
`;

export const Title = tw.h1`
  text-2xl font-bold mb-4
`;

export const StatsGrid = tw.div`
  grid grid-cols-3 gap-4 mb-6
`;

export const ContainerSkeleton = tw(Container)`
  -mt-1
`;
