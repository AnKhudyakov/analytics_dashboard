import tw from 'tailwind-styled-components';

export const Container = tw.div`flex h-full flex-col md:hidden`;

export const Header = tw.div`sticky top-0 z-99 flex h-18.5 items-center justify-between gap-2 bg-secondary px-4 py-2 !text-sm font-semibold text-base-font`;

export const PrimaryHeader = tw.button`flex w-1/2 items-center gap-2 focus-visible:outline focus-visible:outline-secondary-4`;

export const Swiper = tw.div`relative flex w-1/2 items-center justify-end gap-2`;

export const SwipeControls = tw.div`sticky top-18.5 z-90 flex items-center justify-between gap-2 bg-primary p-2 shadow-xl`;

export const ArrowButton = tw.button`rounded-sm p-2 text-base-font hover:cursor-pointer hover:text-neutral-500 focus-visible:outline focus-visible:outline-secondary-4`;

export const Swipeable = tw.div`flex-1 overflow-auto`;

export const Row = tw.div`flex gap-2 text-sm text-base-font even:bg-primary`;

export const Cell = tw.div`w-1/2 truncate px-4 py-3`;

export const StatusWrapper = tw.div`flex h-full justify-center p-6`;
