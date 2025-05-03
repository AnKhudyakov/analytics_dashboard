import tw from 'tailwind-styled-components';

export const Layout = tw.div`
min-h-screen p-0 bg-primary-dark
`;

export const LayoutHeader = tw.div`
  flex justify-between align-middle h-full
`;

export const LayoutBody = tw.div`
  w-full
  min-h-[calc(100vh-30px)]
  sm:min-h-[calc(100vh-30px)]
  md:min-h-[calc(100vh-50px)]
  lg:min-h-[calc(100vh-70px)]
`;

export const LayoutMain = tw.main`
  w-full h-full lg:flex font-sans font-normal bg-primary-dark pt-16 sm:pt-20 lg:pt-0
  transition-all duration-300 ease-in-out
  `;
