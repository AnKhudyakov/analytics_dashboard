import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Form = tw.form`flex w-full flex-col items-center gap-2`;

export const ErrorText = tw.p`min-h-4 w-full text-xs leading-4 text-danger`;

export const NoticeText = tw.p<{
  $tone?: 'danger' | 'muted';
}>`min-h-8 w-full text-xs leading-4 ${({ $tone }) => ($tone === 'danger' ? 'text-danger' : 'text-secondary-font')} `;

export const TextLink = tw(Link)`
  font-semibold text-secondary-4 hover:underline
  focus-visible:outline focus-visible:outline-secondary-4
`;

export const InlineButton = tw.button`cursor-pointer text-xs font-semibold text-secondary-4 hover:underline focus-visible:outline focus-visible:outline-secondary-4`;

export const Divider = tw.div`my-2 flex w-full items-center gap-3 before:h-px before:flex-1 before:bg-secondary-1 before:content-[''] after:h-px after:flex-1 after:bg-secondary-1 after:content-['']`;

export const DividerLabel = tw.span`text-xs font-semibold text-secondary-font`;

export const ProviderRow = tw.div`flex w-full items-center justify-center gap-3`;

export const ProviderLink = tw.a`glass-field flex h-10 flex-1 cursor-pointer items-center justify-center rounded-md border border-secondary-1 hover:brightness-95 focus-visible:outline focus-visible:outline-secondary-4`;

export const ProviderButton = tw.button`glass-field flex h-10 flex-1 cursor-pointer items-center justify-center rounded-md border border-secondary-1 transition-[filter] duration-150 hover:brightness-95 focus-visible:outline focus-visible:outline-secondary-4`;

export const FooterText = tw.p`mt-2 w-full text-center text-xs font-semibold text-secondary-font`;
