import tw from 'tailwind-styled-components';

import { Icons } from 'shared/ui/icons';

export const ButtonLoader = tw(Icons.spinner)`
 inline text-secondary animate-spin dark:text-secondary-font fill-secondary-4
`;
