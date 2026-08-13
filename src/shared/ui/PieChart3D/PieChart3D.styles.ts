import tw from 'tailwind-styled-components';

export const Frame = tw.div`flex w-full min-w-0 flex-col gap-3`;

export const Svg = tw.svg<{
  $compact?: boolean;
}>`h-auto w-full max-w-80 self-center ${({ $compact }) => ($compact ? 'max-h-28' : '')} `;

export const Legend = tw.ul`flex w-full flex-col gap-1`;

export const LegendRow = tw.li<{
  $active: boolean;
}>`flex items-center gap-2 rounded-sm px-1 py-0.5 text-xs ${({ $active }) => ($active ? 'bg-secondary-5 text-base-font' : 'text-secondary-font')} `;

export const LegendSwatch = tw.span`h-2.5 w-2.5 shrink-0 rounded-full`;

export const LegendLabel = tw.span`min-w-0 flex-1 truncate`;

export const LegendValue = tw.span`shrink-0 text-base-font tabular-nums`;

export const LegendShare = tw.span`w-9 shrink-0 text-right tabular-nums`;
