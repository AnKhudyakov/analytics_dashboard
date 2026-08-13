import tw from 'tailwind-styled-components';

import { Typography } from '../Typography';

export const Container = tw.div<{
  $compact?: boolean;
}>`flex h-fit flex-col p-2 ${({ $compact }) => ($compact ? 'w-full min-w-0 gap-1' : 'w-fit gap-2')} `;

export const StyledTypography = tw(Typography)`
  text-xs
`;

export const StatusPositive = tw.div`flex h-4.5 w-fit items-center gap-1 rounded-xs border border-custom-2 bg-custom-1 p-1 text-success`;

export const StatusNegative = tw(StatusPositive)`
  bg-custom-3 border border-custom-4 text-danger
`;

export const Content = tw.div`flex h-fit w-full flex-wrap items-center gap-x-3 gap-y-1`;
