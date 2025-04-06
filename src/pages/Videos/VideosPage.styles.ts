import tw from 'tailwind-styled-components';

export const Container = tw.div`
  p-10 bg-neutral-800 min-h-screen text-neutral-100 w-full
`;

export const LoadingText = tw.p`
  text-center text-neutral-400
`;

export const ErrorText = tw.p`
  text-center text-red-500
`;

export const ChannelsContent = tw.div`
h-[calc(100vh-190px)]
`;
