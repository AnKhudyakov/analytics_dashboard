import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  bg-neutral-800 h-screen w-full flex justify-center items-center
`;

export const Container = tw.div`
bg-neutral-800 h-screen text-base-font w-full sm:max-w-6xl
  flex flex-col sm:flex-row justify-center items-center
`;

export const LoadingText = tw.p`
  text-center text-secondary-font
`;

export const ChannelsContent = tw.div`
h-[calc(100vh-190px)]
`;
