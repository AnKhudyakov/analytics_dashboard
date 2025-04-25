import tw from 'tailwind-styled-components';

export const SidebarContainer = tw.aside`
  hidden lg:flex flex-col items-center
  lg:w-88
  min-h-screen bg-neutral-800 p-4 md:p-6 border-r border-secondary-dark
  text-base-font drop-shadow-sidebar gap-6
  transition-all duration-300 ease-in-out
`;

export const Nav = tw.nav`
  w-full h-full
`;

export const FlexContainer = tw.div`
  flex gap-2 justify-between items-start
`;
