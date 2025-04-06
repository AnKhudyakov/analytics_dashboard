import tw from 'tailwind-styled-components';
import { Typography } from '../Typography';

export const Container = tw.div`
  w-fit h-fit p-2 flex flex-col gap-2
`;

export const StyledTypography = tw(Typography)`
  text-xs
`;

export const StatusPositive = tw.div`
 flex items-center gap-1 p-1 h-4.5 bg-custom-1 border border-custom-2 text-green-500 rounded-xs w-fit
`;

export const StatusNegative = tw(StatusPositive)`
  bg-custom-3 border border-custom-4 text-red-400
`;

export const Content = tw.div`
  w-full h-fit flex gap-4 items-center
`;
