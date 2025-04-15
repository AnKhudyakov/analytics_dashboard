import { Card } from 'shared/ui/components/Card';
import tw from 'tailwind-styled-components';

export const Container = tw.div`
  flex gap-4 max-w-200 flex-1
`;

export const InfoWrapper = tw.div`
  p-6
`;

export const BannerWrapper = tw.div`
  flex justify-center flex-1 h-full
`;

export const FlexContainer = tw(Container)`
  flex justify-between overflow-visible
`;

export const Banner = tw.img`
  w-full object-cover max-w-200 rounded-l-lg max-h-80 h-70
`;

export const Avatar = tw.img`
  w-16 h-16 rounded-full border border-secordary-500
`;

export const TitleLink = tw.a`
  text-xl font-semibold hover:underline
`;
