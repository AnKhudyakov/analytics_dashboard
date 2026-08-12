import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from 'shared/ui/Card';
import { Error } from 'shared/ui/Error';

interface ErrorFallbackProps {
  onReset: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ onReset }) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-primary p-6">
      <Card className="w-full max-w-120 py-10">
        <Error text={t('shared.errorUnexpected')} onRetry={onReset} />
      </Card>
    </div>
  );
};
