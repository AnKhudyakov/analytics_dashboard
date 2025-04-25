import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'shared/constants';
import { useThemeContext } from 'shared/context/ThemeContext';
import { Button } from 'shared/ui/components/Button';
import { Card } from 'shared/ui/components/Card';
import { Popup } from 'shared/ui/components/Popup';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { Container, Option, Wrapper } from './Settings.styles';

interface SettingsProps {}

export const Settings: FC<SettingsProps> = () => {
  const { mode, setMode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const language =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <Container>
      <div className="relative w-14">
        <Button
          icon
          className={'hover:opacity-50'}
          onClick={() => setOpen(!open)}
        >
          <Typography variant="subtitle">{language.label}</Typography>
        </Button>
        {open && (
          <Wrapper>
            <Card className="p-0">
              <Popup onClose={() => setOpen(false)}>
                {LANGUAGES.map(({ code, label }) => (
                  <Option
                    key={label}
                    onClick={handleChangeLanguage.bind(this, code)}
                  >
                    <Typography variant="subtitle">{label}</Typography>
                  </Option>
                ))}
              </Popup>
            </Card>
          </Wrapper>
        )}
      </div>
      <Button
        icon
        className={'hover:opacity-50'}
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode !== 'dark' ? <Icons.moon /> : <Icons.sun />}
      </Button>
    </Container>
  );
};
