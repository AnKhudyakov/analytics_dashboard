import tw from 'tailwind-styled-components';

export const Container = tw.aside`fixed top-0 left-0 z-999 flex h-full w-66 transform flex-col gap-4 border-r border-secondary bg-neutral-800 p-4 transition-transform duration-300 ease-in-out lg:hidden`;

export const MobileHeader = tw.div`fixed top-0 left-0 z-999 flex w-full justify-between gap-6 border-b border-secondary bg-neutral-800 p-4 text-base-font shadow-msidebar sm:p-6 lg:hidden`;

export const HeaderLeft = tw.div`flex gap-6 drop-shadow-none`;

export const Overlay = tw.div`fixed inset-0 z-999 bg-black/40 lg:hidden`;

export const HeaderMenu = tw.div`flex items-center justify-start`;

export const SettingsWrapper = tw.div`relative flex items-center justify-between`;
