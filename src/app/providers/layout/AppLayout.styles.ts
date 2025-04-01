import tw from 'tailwind-styled-components';

export const Layout = tw.div`
h-screen p-0 bg-primary-dark
`;

// export const Header = tw.header`
// h-[30px]
// sm:h-[30px]
// md:h-[50px]
// lg:h-[70px]
// `;

export const LayoutHeader = tw.div`
  flex justify-between align-middle h-full
`;

export const LayoutBody = tw.div`
  w-full
  h-[calc(100vh-30px)]
  sm:h-[calc(100vh-30px)]
  md:h-[calc(100vh-50px)]
  lg:h-[calc(100vh-70px)]
`;

export const LayoutMain = tw.main`
  w-full h-full flex font-sans font-normal
`;
