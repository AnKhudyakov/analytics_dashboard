import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type LanguageCode, LANGUAGES } from 'shared/constants';
import { Button } from 'shared/ui/Button';
import { Card } from 'shared/ui/Card';
import { Popup } from 'shared/ui/Popup';

import { LanguageItem } from './LanguageItem';
import { Option, OptionList, Wrapper } from './LanguageSwitcher.styles';

export interface LanguageSwitcherProps {
  position?: 'up' | 'down';
}

const isLanguageCode = (value: string): value is LanguageCode =>
  LANGUAGES.some((language) => language.code === value);

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  position = 'down',
}) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const currentCode = isLanguageCode(i18n.language) ? i18n.language : 'en';
  const current =
    LANGUAGES.find(({ code }) => code === currentCode) ?? LANGUAGES[0];
  const options = LANGUAGES.filter(({ code }) => code !== currentCode);

  const handleChange = (code: LanguageCode) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <>
      <Button
        icon
        aria-label={t('settings.changeLanguage')}
        aria-expanded={isOpen}
        className="hover:opacity-50"
        onClick={() => setOpen((open) => !open)}
      >
        <LanguageItem code={current.code} label={current.label} />
      </Button>
      {isOpen && (
        <Wrapper className={position === 'up' ? 'top-6' : 'bottom-6'}>
          <Card className="p-0">
            <Popup
              onClose={() => setOpen(false)}
              label={t('settings.changeLanguage')}
            >
              <OptionList>
                {options.map(({ code, label }) => (
                  <li key={code}>
                    <Option type="button" onClick={() => handleChange(code)}>
                      <LanguageItem code={code} label={label} />
                    </Option>
                  </li>
                ))}
              </OptionList>
            </Popup>
          </Card>
        </Wrapper>
      )}
    </>
  );
};
