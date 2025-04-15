import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const Form = tw.form`
  flex flex-col gap-1 items-center
  max-w-sm
  mx-auto
  p-2
  rounded
  shadow
`;

export const ErrorText = tw.p`
  text-red-500
  text-sm
`;

export const Empty = tw.div`
 h-4.5
`;
