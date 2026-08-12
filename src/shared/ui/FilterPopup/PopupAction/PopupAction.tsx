import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared/ui/Button';

import { Actions } from '../FilterPopup.styles';

interface PopupActionProps {
  onApply: () => void;
  onClear: () => void;
  canApply: boolean;
  canClear: boolean;
}

export const PopupAction: FC<PopupActionProps> = ({
  onApply,
  onClear,
  canApply,
  canClear,
}) => {
  const { t } = useTranslation();

  return (
    <Actions>
      <Button onClick={onApply} disabled={!canApply}>
        {t('shared.apply')}
      </Button>
      <Button onClick={onClear} disabled={!canClear}>
        {t('shared.clear')}
      </Button>
    </Actions>
  );
};
