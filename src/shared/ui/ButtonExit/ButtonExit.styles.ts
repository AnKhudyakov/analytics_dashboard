import tw from 'tailwind-styled-components';

import { Icons } from 'shared/ui/icons';

export const ExitIcon = tw(Icons.exit)`
  fill-secondary text-base-font
  hover:fill-neutral-700 hover:cursor-pointer transition-colors hover:text-white
`;
