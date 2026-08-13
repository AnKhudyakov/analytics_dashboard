import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type LanguageCode, LANGUAGES } from 'shared/constants';
import { Button } from 'shared/ui/Button';
import { Popup } from 'shared/ui/Popup';

import { LanguageItem } from './LanguageItem';
import {
  InlineList,
  InlineOption,
  Option,
  OptionList,
  Wrapper,
} from './LanguageSwitcher.styles';

export interface LanguageSwitcherProps {
  position?: 'up' | 'down';
  inline?: boolean;
}

const isLanguageCode = (value: string): value is LanguageCode =>
  LANGUAGES.some((language) => language.code === value);

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  position = 'down',
  inline,
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

  if (inline) {
    return (
      <InlineList aria-label={t('settings.changeLanguage')}>
        {LANGUAGES.map(({ code, label }) => (
          <li key={code}>
            <InlineOption
              type="button"
              $active={code === currentCode}
              aria-pressed={code === currentCode}
              onClick={() => handleChange(code)}
            >
              <LanguageItem code={code} label={label} />
            </InlineOption>
          </li>
        ))}
      </InlineList>
    );
  }

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
        </Wrapper>
      )}
    </>
  );
};
