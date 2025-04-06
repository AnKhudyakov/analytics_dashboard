import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const LoaderContainer = tw.div`
  flex justify-center items-center h-screen w-full
`;

export const StyledLoader = tw(Icons.spinner)`
 inline w-30 h-30 text-secordary-dark animate-spin dark:text-neutral-400 fill-blue-600
`;
