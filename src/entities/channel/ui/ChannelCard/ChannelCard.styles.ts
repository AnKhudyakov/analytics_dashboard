import tw from 'tailwind-styled-components';

export const Container = tw.div`flex max-w-200 flex-1 gap-4`;

export const InfoWrapper = tw.div`flex gap-6 p-6 sm:flex-col sm:gap-3`;

export const BannerWrapper = tw.div`flex h-37.5 max-h-80 w-full flex-1 justify-center sm:h-70`;

export const TitleLink = tw.a`text-xl font-semibold hover:underline focus-visible:outline focus-visible:outline-secondary-4`;
