import tw from 'tailwind-styled-components';

import { Typography } from '../Typography';

export const Container = tw.div`flex h-fit w-fit flex-col gap-2 p-2`;

export const StyledTypography = tw(Typography)`
  text-xs
`;

export const StatusPositive = tw.div`flex h-4.5 w-fit items-center gap-1 rounded-xs border border-custom-2 bg-custom-1 p-1 text-success`;

export const StatusNegative = tw(StatusPositive)`
  bg-custom-3 border border-custom-4 text-danger
`;

export const Content = tw.div`flex h-fit w-full items-center gap-4`;
