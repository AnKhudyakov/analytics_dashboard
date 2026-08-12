import { useTranslation } from 'react-i18next';

import { LoginForm } from 'features/auth';
import { AuthLayout } from 'widgets/auth-layout';

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('login.title')}
      subtitle={t('login.subtitle')}
      body={t('login.body')}
    >
      <LoginForm />
    </AuthLayout>
  );
};
