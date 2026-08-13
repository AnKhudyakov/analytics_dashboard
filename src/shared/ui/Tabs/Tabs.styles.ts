import tw from 'tailwind-styled-components';

export const TabList = tw.div`glass-panel relative flex w-full min-w-0 items-stretch overflow-hidden rounded-panel`;

export const Indicator = tw.span`accent-surface pointer-events-none absolute inset-y-0 left-0 rounded-panel transition-transform duration-300 ease-out motion-reduce:transition-none`;

export const Tab = tw.button<{
  $active?: boolean;
}>`relative z-10 flex min-w-0 flex-1 items-center justify-center gap-2 px-3 py-2 text-xs font-semibold hover:cursor-pointer focus-visible:outline focus-visible:outline-secondary-4 disabled:cursor-not-allowed disabled:opacity-50 ${({
  $active,
}) => ($active ? 'text-white' : 'text-secondary-font hover:text-base-font')} `;

export const TabLabel = tw.span`truncate`;
