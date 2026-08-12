import tw from 'tailwind-styled-components';

export const SidebarContainer = tw.aside`fixed top-0 left-0 z-999 hidden min-h-screen flex-col items-center justify-between gap-6 border-r border-secondary bg-neutral-800 p-4 text-base-font drop-shadow-sidebar transition-all duration-300 ease-in-out lg:flex`;

export const Wrapper = tw.div`flex h-full w-full flex-col gap-4`;

export const Nav = tw.nav`h-full w-full`;

export const FlexContainer = tw.div`flex items-start justify-between gap-2`;

export const SettingsWrapper = tw.div`relative flex w-full items-center justify-between gap-6`;
