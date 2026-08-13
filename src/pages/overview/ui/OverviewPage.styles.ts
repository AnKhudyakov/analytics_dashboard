import tw from 'tailwind-styled-components';

export const Container = tw.section`mx-auto flex h-fit min-h-screen w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:p-10`;

export const KpiRow = tw.div`glass-panel grid grid-cols-2 gap-1 rounded-panel p-2 sm:grid-cols-4 sm:gap-2 sm:p-3 xl:grid-cols-8`;

export const MapRow = tw.div`grid w-full grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3`;

export const ChartRow = tw.div`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4`;

export const Panel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5`;

export const WidePanel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5 xl:col-span-2`;

export const CardTitle = tw.h3`text-sm font-semibold text-base-font`;

export const Notice = tw.p`text-xs text-secondary-font`;

export const SkeletonRoot = tw.div`flex w-full flex-col gap-4 sm:gap-6`;

export const SkeletonTile = tw.div`flex flex-col gap-1 p-2`;

export const SkeletonMap = tw.div`flex w-full flex-col`;

export const SkeletonMapLegend = tw.div`pt-2`;

export const SkeletonPie = tw.div`flex w-full min-w-0 flex-col gap-3`;

export const SkeletonPieCanvas = tw.div`w-full max-w-80 self-center`;

export const SkeletonPieLegend = tw.div`flex w-full flex-col gap-1`;
