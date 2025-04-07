import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const LoaderContainer = tw.div`
  flex justify-center items-center h-full w-full
`;

export const StyledLoader = tw(Icons.spinner)`
 inline text-secordary-dark animate-spin dark:text-neutral-400 fill-blue-600
`;
