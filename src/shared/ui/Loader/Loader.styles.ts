import tw from 'tailwind-styled-components';

export const LoaderContainer = tw.div<{
  $fullScreen?: boolean;
}>`flex w-full flex-col items-center justify-center ${({ $fullScreen }) =>
  $fullScreen
    ? 'fixed inset-0 z-50 h-dvh bg-primary'
    : 'min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-5rem)] lg:min-h-dvh'} `;

export const LoaderText = tw.div`loader-text`;

export const LoaderWrapper = tw.div`p-4`;

export const LoaderContent = tw.div`loader-box`;
