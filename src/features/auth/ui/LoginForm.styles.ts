import tw from 'tailwind-styled-components';

export const Form = tw.form`
  flex flex-col gap-4 items-center
  max-w-sm
  mx-auto
  p-2
  rounded
  shadow
`;

export const ErrorText = tw.p`
  text-red-500
  text-sm
  mt-2
`;

export const Empty = tw.div`
 h-6.5
`;
