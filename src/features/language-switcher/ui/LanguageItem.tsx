import { type FC } from 'react';

import { type LanguageCode } from 'shared/constants';
import { LangIconMap } from 'shared/ui/icons';
import { Typography } from 'shared/ui/Typography';

interface LanguageItemProps {
  code: LanguageCode;
  label: string;
}

export const LanguageItem: FC<LanguageItemProps> = ({ code, label }) => (
  <span className="flex items-center gap-1">
    {LangIconMap[code]}
    <Typography variant="subtitle" className="!text-sm">
      {label}
    </Typography>
  </span>
);
