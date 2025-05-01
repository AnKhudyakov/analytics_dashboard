import { FC } from 'react';
import { Typography } from 'shared/ui/components/Typography';
import { LangIconMap } from 'shared/ui/icons';

interface ILanguageProps {
  code: keyof typeof LangIconMap;
  label: string;
}

export const LanguageItem: FC<ILanguageProps> = ({ code, label }) => {
  return (
    <div className="flex gap-1 items-center">
      {LangIconMap[code]}
      <Typography variant="subtitle" className="!text-sm">
        {label}
      </Typography>
    </div>
  );
};
