import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Frame = tw.div`relative w-full min-w-0`;

export const Svg = tw.svg`h-auto w-full`;

export const Dot = tw.g`cursor-pointer outline-none`;

export const TooltipCard = tw.div`glass-strong absolute z-20 flex w-52 -translate-x-1/2 -translate-y-[calc(100%+14px)] flex-col gap-1 rounded-xl p-3 shadow-lg`;

export const TooltipTitle = tw.p`text-xs font-semibold text-base-font`;

export const TooltipLink = tw(Link)`
  flex items-center justify-between gap-2 rounded-sm text-xs text-secondary-font
  hover:text-base-font hover:underline
`;

export const TooltipValue = tw.span`shrink-0 text-base-font tabular-nums`;

export const Legend = tw.div`flex flex-wrap items-center gap-4 pt-2`;

export const LegendItem = tw.span`flex items-center gap-2 text-xs text-secondary-font`;

export const LegendSwatch = tw.span`h-2.5 w-2.5 rounded-full`;

export const Notice = tw.p`pt-1 text-xs text-secondary-font`;
