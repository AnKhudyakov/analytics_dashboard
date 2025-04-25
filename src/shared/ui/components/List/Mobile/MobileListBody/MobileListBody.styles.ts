import tw from 'tailwind-styled-components';

export const Row = tw.div`
    flex text-base-font text-sm gap-2 even:bg-primary-dark
`;

export const Cell = tw.div`
    w-1/2 truncate px-4 py-3
`;

export const Wrapper = tw.div`
    p-6 flex justify-center h-full
`;
