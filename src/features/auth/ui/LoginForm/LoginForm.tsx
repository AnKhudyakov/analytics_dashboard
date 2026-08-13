import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from 'shared/constants';
import { Button } from 'shared/ui/Button';
import { ButtonLoader } from 'shared/ui/ButtonLoader';
import { Icons } from 'shared/ui/icons';
import { Input } from 'shared/ui/Input';
import { Typography } from 'shared/ui/Typography';

import { useLogin } from '../../model/useLogin';
import { type LoginFormValues, loginSchema } from '../../model/validation';
import {
  Divider,
  DividerLabel,
  FooterText,
  Form,
  InlineButton,
  NoticeText,
  ProviderButton,
  ProviderRow,
  TextLink,
} from './LoginForm.styles';

const PROVIDERS = [
  { id: 'google', labelKey: 'login.continueWithGoogle', Icon: Icons.google },
  {
    id: 'linkedin',
    labelKey: 'login.continueWithLinkedin',
    Icon: Icons.linkedin,
  },
  {
    id: 'facebook',
    labelKey: 'login.continueWithFacebook',
    Icon: Icons.facebook,
  },
] as const;

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading, hasFailed } = useLogin();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setNotice('');
    const succeeded = await login(values);
    if (succeeded) void navigate(routerPaths.CHANNELS, { replace: true });
  });

  return (
    <Form onSubmit={(event) => void onSubmit(event)} noValidate>
      <Typography variant="subtitle" className="w-full">
        {t('login.formTitle')}
      </Typography>
      <Typography variant="body" className="mb-2 w-full text-secondary-font">
        {t('login.formSubtitle')}
      </Typography>

      <Input
        label={t('login.username')}
        placeholder={t('login.username')}
        autoComplete="username"
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        label={t('login.password')}
        placeholder={t('login.password')}
        autoComplete="current-password"
        error={errors.password?.message}
        endIcon={
          isPasswordVisible ? <Icons.hidePassword /> : <Icons.showPassword />
        }
        endIconLabel={
          isPasswordVisible ? t('login.hidePassword') : t('login.showPassword')
        }
        onEndIconClick={() => setPasswordVisible((visible) => !visible)}
        {...register('password')}
      />

      <div className="w-full">
        <InlineButton
          type="button"
          onClick={() => setNotice(t('login.recoveryUnavailable'))}
        >
          {t('login.forgotPassword')}
        </InlineButton>
      </div>

      <NoticeText role="alert" $tone={hasFailed ? 'danger' : 'muted'}>
        {hasFailed ? t('login.error') : notice}
      </NoticeText>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? (
          <ButtonLoader width={20} height={20} aria-hidden />
        ) : (
          t('login.formTitle')
        )}
      </Button>

      <Divider>
        <DividerLabel>{t('login.orContinueWith')}</DividerLabel>
      </Divider>

      <ProviderRow>
        {PROVIDERS.map(({ id, labelKey, Icon }) => (
          <ProviderButton
            key={id}
            type="button"
            aria-label={t(labelKey)}
            onClick={() => setNotice(t('login.providersUnavailable'))}
          >
            <Icon aria-hidden />
          </ProviderButton>
        ))}
      </ProviderRow>

      <FooterText>
        {t('login.noAccount')}{' '}
        <TextLink to={routerPaths.SIGNUP}>{t('login.signupLink')}</TextLink>
      </FooterText>
    </Form>
  );
};
