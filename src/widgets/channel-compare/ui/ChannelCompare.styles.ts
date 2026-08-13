import tw from 'tailwind-styled-components';

export const Grid = tw.div`flex w-full flex-col gap-4 sm:gap-6`;

export const MetricRow = tw.div`flex flex-wrap gap-2`;

export const MetricButton = tw.button<{
  $active?: boolean;
}>`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-secondary-4 ${({
  $active,
}) =>
  $active
    ? 'border-transparent bg-secondary-5 text-base-font'
    : 'border-secondary-1 text-secondary-font hover:text-base-font'} `;

export const CardRow = tw.ul`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4`;

export const Card = tw.li`glass-panel flex min-w-0 flex-col gap-1 rounded-panel p-3 sm:p-4`;

export const CardHead = tw.div`flex min-w-0 items-center gap-2`;

export const Dot = tw.span`h-2.5 w-2.5 shrink-0 rounded-full`;

export const Avatar = tw.div`relative h-7 w-7 shrink-0 overflow-hidden rounded-full`;

export const CardName = tw.p`min-w-0 flex-1 truncate text-xs font-semibold text-base-font`;

export const CardValue = tw.p`text-lg font-bold text-base-font tabular-nums`;

export const CardDelta = tw.p<{
  $positive?: boolean;
}>`text-xs font-semibold tabular-nums ${({ $positive }) => ($positive ? 'text-success' : 'text-danger')} `;

export const CardMeta = tw.p`text-xs text-secondary-font`;

export const Row = tw.div`grid w-full grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-4`;

export const Panel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5`;

export const WidePanel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5 xl:col-span-2`;

export const SmallRow = tw.div`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4`;

export const SectionTitle = tw.h3`text-sm font-semibold text-base-font`;

export const CardTitle = tw.h3`min-w-0 truncate text-sm font-semibold text-base-font`;

export const Notice = tw.p`text-xs text-secondary-font`;

export const SkeletonPie = tw.div`flex w-full min-w-0 flex-col gap-3`;

export const SkeletonPieCanvas = tw.div`w-full max-w-80 self-center`;

export const SkeletonPieLegend = tw.div`flex w-full flex-col gap-1`;

export const SkeletonRows = tw.div`flex w-full flex-col gap-3`;
