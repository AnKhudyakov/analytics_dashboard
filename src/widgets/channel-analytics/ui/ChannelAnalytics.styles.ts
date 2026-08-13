import tw from 'tailwind-styled-components';

export const Grid = tw.div`grid w-full grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2`;

export const KpiGrid = tw.div`glass-panel grid grid-cols-2 gap-2 rounded-panel p-3 sm:gap-4 sm:p-4 lg:grid-cols-4 xl:col-span-2`;

export const Panel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5`;

export const CardTitle = tw.h3`text-sm font-semibold text-base-font`;
