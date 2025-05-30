import tw from 'tailwind-styled-components';

export const SidebarContainer = tw.aside`
  fixed top-0 left-0 z-999 justify-between
  hidden lg:flex flex-col items-center
  min-h-screen bg-neutral-800 p-4 border-r border-secondary
  text-base-font drop-shadow-sidebar gap-6
  transition-all duration-300 ease-in-out
`;

export const Wrapper = tw.div`
  h-full w-full flex flex-col gap-4
`;

export const Nav = tw.nav`
  w-full h-full
`;

export const FlexContainer = tw.div`
  flex gap-2 justify-between items-start
`;

export const SettingsWrapper = tw.div`
   flex w-full justify-between items-center relative gap-6
`;
