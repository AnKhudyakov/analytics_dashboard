import tw from 'tailwind-styled-components';

export const List = tw.ol`flex w-full flex-col gap-2`;

export const Step = tw.li`flex w-full flex-col gap-1`;

export const Row = tw.div`flex items-baseline justify-between gap-3`;

export const Label = tw.span`min-w-0 truncate text-xs font-semibold text-secondary-font`;

export const Value = tw.span`shrink-0 text-xs font-semibold text-base-font tabular-nums`;

export const Track = tw.div`h-6 w-full overflow-hidden rounded-md bg-neutral-700`;

export const Bar = tw.div`flex h-full items-center justify-end rounded-md px-2`;

export const Share = tw.span`text-[0.625rem] font-semibold text-white tabular-nums`;
