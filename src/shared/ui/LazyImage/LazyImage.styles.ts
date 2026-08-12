import tw from 'tailwind-styled-components';

export const Image = tw.img`h-full w-full object-cover transition-opacity duration-700 ease-in-out`;

export const ContainerSkeleton = tw.div`-mt-1 w-full [--base-color:var(--color-secondary-1)] [--highlight-color:var(--color-neutral-700)]`;
