import tw from 'tailwind-styled-components';

export const List = tw.ul`flex w-full flex-col gap-3`;

export const Item = tw.li`flex w-full flex-col gap-1`;

export const Row = tw.div`flex items-baseline justify-between gap-3`;

export const Label = tw.span`flex min-w-0 items-center gap-2 text-xs font-semibold text-secondary-font`;

export const Value = tw.span`shrink-0 text-xs font-semibold text-base-font tabular-nums`;

export const Track = tw.div`h-1.5 w-full overflow-hidden rounded-full bg-neutral-700`;

export const Bar = tw.div`h-full rounded-full bg-chart-1`;
