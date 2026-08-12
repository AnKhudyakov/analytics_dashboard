import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'shared/lib/theme';
import { Button } from 'shared/ui/Button';
import { Icons } from 'shared/ui/icons';

export const ThemeSwitcher: FC = () => {
  const { t } = useTranslation();
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      icon
      aria-label={t(
        mode === 'dark' ? 'settings.lightMode' : 'settings.darkMode'
      )}
      className="hover:opacity-50"
      onClick={toggleMode}
    >
      {mode === 'dark' ? <Icons.sun aria-hidden /> : <Icons.moon aria-hidden />}
    </Button>
  );
};
