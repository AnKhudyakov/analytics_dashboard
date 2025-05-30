import tw from 'tailwind-styled-components';

export const Image = tw.img`
  transition-opacity duration-700 ease-in-out object-cover h-full w-full
`;

export const ContainerSkeleton = tw.div`
  -mt-1 w-full
`;
