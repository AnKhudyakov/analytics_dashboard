import tw from 'tailwind-styled-components';

export const LoaderContainer = tw.div`
  flex justify-center items-center h-full w-full
`;

export const LoaderWrapper = tw.div`
  flex justify-center items-center text-white relative uppercase
  [letter-spacing:0.1em] w-[14em] h-[14em] rounded-full
  [transform:rotateX(30deg)_rotateZ(45deg)]
`;

export const LoaderText = tw.div`
  text-[0.75em] max-w-[5rem] relative
  [text-shadow:0_0_0.1em_var(--fg-t)]
  [transform:rotateZ(-45deg)]
`;

export const Dot = tw.div`
  absolute rounded-full w-[1.5em] h-[1.5em] top-[calc(50%-0.75em)] left-[calc(50%-0.75em)]
  animate-shadow724
`;

export const DotInner = tw.div`
  absolute w-full h-full rounded-full
  bg-[var(--bg)]
  animate-pushInOut1724
  [box-shadow:0.05em_0_0.1em_rgba(255,255,255,0.2)_inset]
  z-[1]
`;

export const DotAfter = tw.div`
  absolute w-full h-[3em] bottom-0 rounded-[0.75em]
  bg-[var(--primary1)]
  animate-pushInOut2724
  [box-shadow:0.1em_0.3em_0.2em_rgba(255,255,255,0.4)_inset,0_-0.4em_0.2em_#2e3138_inset,0_-1em_0.25em_rgba(0,0,0,0.3)_inset]
  [clip-path:polygon(0_75%,100%_75%,100%_100%,0_100%)]
  [transform:rotate(-45deg)]
  [transform-origin:50%_2.25em]
`;
