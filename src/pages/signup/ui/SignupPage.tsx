import { useTranslation } from 'react-i18next';

import { SignupForm } from 'features/auth';
import { AuthLayout } from 'widgets/auth-layout';

export const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout title={t('signup.title')} body={t('signup.body')}>
      <SignupForm />
    </AuthLayout>
  );
};
