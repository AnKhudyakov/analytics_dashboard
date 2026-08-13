import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`flex w-full min-w-0 flex-1 flex-col gap-4`;

export const ChartBox = tw.div`flex min-h-40 w-full flex-1 items-center justify-center`;

export const Legend = tw.ul`flex w-full min-w-0 flex-col gap-2`;

export const LegendRow = tw.li`flex items-center gap-2`;

export const LegendDot = tw.span`h-2.5 w-2.5 shrink-0 rounded-full`;

export const LegendLabel = tw.span`min-w-0 flex-1 truncate text-xs font-semibold text-secondary-font`;

export const LegendValue = tw.span`shrink-0 text-xs font-semibold text-base-font tabular-nums`;
