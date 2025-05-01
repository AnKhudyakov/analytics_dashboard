import tw from 'tailwind-styled-components';

export const SidebarContainer = tw.aside`
  fixed top-0 left-0 z-999 justify-between
  hidden lg:flex flex-col items-center w-64 lg:w-64
  min-h-screen bg-neutral-800 p-4 md:p-6 border-r border-secondary-dark
  text-base-font drop-shadow-sidebar gap-6
  transition-all duration-300 ease-in-out
`;

export const Wrapper = tw.div`
  h-full w-full flex flex-col gap-6
`;

export const Nav = tw.nav`
  w-full h-full
`;

export const FlexContainer = tw.div`
  flex gap-2 justify-between items-start
`;
