import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'shared/constants';
import { useThemeContext } from 'shared/context/ThemeContext';
import { Button } from 'shared/ui/components/Button';
import { Card } from 'shared/ui/components/Card';
import { Popup } from 'shared/ui/components/Popup';
import { Icons, LangIconMap } from 'shared/ui/icons';
import { LanguageItem } from './LanguageItem';
import { Container, Option, Wrapper } from './Settings.styles';

interface SettingsProps {
  row?: boolean;
  position?: 'up' | 'down';
}

export const Settings: FC<SettingsProps> = ({ row, position }) => {
  const { mode, setMode } = useThemeContext();
  const { i18n } = useTranslation();

  const [isOpenLang, setIsOpenLang] = useState(false);

  const selectedLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];
  const options = LANGUAGES.filter((l) => l.code !== i18n.language);
  const selectedCode = selectedLang.code as keyof typeof LangIconMap;

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpenLang(false);
  };

  return (
    <Container className={row ? 'flex-row' : 'flex-col-reverse'}>
      <Button
        icon
        className={'hover:opacity-50'}
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode !== 'dark' ? <Icons.moon /> : <Icons.sun />}
      </Button>
      <Button
        icon
        className={'hover:opacity-50'}
        onClick={() => setIsOpenLang(!isOpenLang)}
      >
        <LanguageItem code={selectedCode} label={selectedLang.label} />
      </Button>
      {isOpenLang && (
        <Wrapper className={position !== 'up' ? 'bottom-6' : 'top-6'}>
          <Card className="p-0">
            <Popup onClose={() => setIsOpenLang(false)}>
              {options.map(({ code, label }) => (
                <Option
                  key={label}
                  onClick={handleChangeLanguage.bind(this, code)}
                >
                  <LanguageItem
                    code={code as keyof typeof LangIconMap}
                    label={label}
                  />
                </Option>
              ))}
            </Popup>
          </Card>
        </Wrapper>
      )}
    </Container>
  );
};
