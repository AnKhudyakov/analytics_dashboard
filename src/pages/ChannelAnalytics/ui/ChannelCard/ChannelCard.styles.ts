import { LazyImage } from 'shared/ui/components/LazyImage/LazyImage';
import tw from 'tailwind-styled-components';

export const Container = tw.div`
  flex gap-4 max-w-200 flex-1
`;

export const InfoWrapper = tw.div`
  p-6 flex sm:flex-col gap-6 sm:gap-3
`;

export const BannerWrapper = tw.div`
  flex justify-center flex-1
  w-full rounded-t-lg sm:rounded-t-none sm:rounded-l-lg max-h-80 h-37.5 sm:h-70
`;

export const FlexContainer = tw(Container)`
  flex justify-between overflow-visible
`;

// export const Avatar = tw.img`
//   w-16 h-16 rounded-full border border-secondary-1
// `;

export const TitleLink = tw.a`
  text-xl font-semibold hover:underline
`;
