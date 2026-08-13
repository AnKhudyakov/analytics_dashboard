import tw from 'tailwind-styled-components';

export const Container = tw.section`mx-auto flex h-fit min-h-screen w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:p-10`;

export const Panel = tw.div`glass-panel flex min-w-0 flex-col gap-3 rounded-panel p-4 sm:p-5`;

export const Notice = tw.p`text-xs text-secondary-font`;
