import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`flex min-h-screen w-full items-center justify-center p-4 sm:p-6`;

export const Container = tw.div`flex w-full flex-col items-center justify-center gap-6 text-base-font sm:max-w-7xl sm:flex-row sm:gap-10`;

export const FormArea = tw.div`glass-panel relative flex w-full flex-col items-center justify-center gap-1 rounded-3xl p-5 sm:max-w-125 sm:min-w-90 sm:p-8 md:p-10`;

export const SettingsWrapper = tw.div`absolute top-5 right-5 sm:top-8 sm:right-8 md:top-10 md:right-10`;
