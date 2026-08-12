import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`flex h-screen w-full items-center justify-center bg-neutral-800`;

export const Container = tw.div`flex h-screen w-full flex-col items-center justify-center bg-neutral-800 text-base-font sm:max-w-7xl sm:flex-row`;

export const FormArea = tw.div`sm:shadow-sidebar flex h-full w-full flex-col items-center justify-start gap-1 overflow-auto border-t border-secondary p-3 py-6 shadow-msidebar sm:relative sm:max-w-140 sm:min-w-90 sm:justify-center sm:border-r sm:border-l md:p-6 lg:p-10`;

export const SettingsWrapper = tw.div`absolute top-4 right-3 w-22 md:right-6 lg:right-10`;
