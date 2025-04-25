import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/components/Button';
import { hoverEffect } from 'shared/ui/effects';
import { Footer } from './PopupAction.styles';

interface PopupActionProps {
  onApply: () => void;
  onClear: () => void;
  hasApply: boolean;
  hasFilter: boolean;
}

export const PopupAction: FC<PopupActionProps> = ({
  onApply,
  onClear,
  hasApply,
  hasFilter,
}) => {
  const { t } = useTranslation();

  return (
    <Footer>
      <Button className={hoverEffect} onClick={onApply} disabled={!hasApply}>
        {t('shared.apply')}
      </Button>
      <Button className={hoverEffect} onClick={onClear} disabled={!hasFilter}>
        {t('shared.clear')}
      </Button>
    </Footer>
  );
};
