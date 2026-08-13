import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Container = tw.section`mx-auto flex h-fit min-h-screen w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:p-10`;

export const Grid = tw.div`grid w-full grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2`;

export const Panel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5`;

export const CardTitle = tw.h3`text-sm font-semibold text-base-font`;

export const Stack = tw.div`flex w-full flex-col gap-3`;

export const Field = tw.div`flex items-baseline justify-between gap-3`;

export const FieldLabel = tw.span`text-xs font-semibold text-secondary-font`;

export const FieldValue = tw.span`min-w-0 truncate text-xs font-semibold text-base-font`;

export const Row = tw.div`flex items-center gap-3`;

export const Avatar = tw.div`h-10 w-10 shrink-0 overflow-hidden rounded-full border border-secondary-1`;

export const RowMeta = tw.div`flex min-w-0 flex-1 flex-col`;

export const RowTitle = tw(
  Link
)`truncate text-sm font-semibold text-base-font hover:underline focus-visible:outline focus-visible:outline-secondary-4`;

export const RowStats = tw.span`truncate text-xs text-secondary-font tabular-nums`;

export const Notice = tw.p`text-xs text-secondary-font`;
