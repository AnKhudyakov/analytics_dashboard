import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Form = tw.form`flex w-full flex-col items-center gap-2 p-4 sm:p-6`;

export const ErrorText = tw.p`min-h-4 w-full text-xs text-danger`;

export const TextLink = tw(Link)`
  font-semibold text-secondary-4 hover:underline
  focus-visible:outline focus-visible:outline-secondary-4
`;
