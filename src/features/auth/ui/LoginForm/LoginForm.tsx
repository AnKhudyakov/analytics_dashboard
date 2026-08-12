import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from 'shared/constants';
import { Button } from 'shared/ui/Button';
import { ButtonLoader } from 'shared/ui/ButtonLoader';
import { Checkbox } from 'shared/ui/Checkbox';
import { Icons } from 'shared/ui/icons';
import { Input } from 'shared/ui/Input';
import { Typography } from 'shared/ui/Typography';

import { useLogin } from '../../model/useLogin';
import { type LoginFormValues, loginSchema } from '../../model/validation';
import { ErrorText, Form, TextLink } from './LoginForm.styles';

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading, hasFailed } = useLogin();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: '', password: '', remember: true },
  });

  const onSubmit = handleSubmit(async (values) => {
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
      <Checkbox
        label={t('login.remember')}
        checked={watch('remember')}
        {...register('remember')}
      />

      <ErrorText role="alert">{hasFailed ? t('login.error') : ''}</ErrorText>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <ButtonLoader width={20} height={20} aria-hidden />
        ) : (
          t('login.formTitle')
        )}
      </Button>

      <div className="flex items-end gap-1">
        <Typography variant="body" className="text-secondary-font">
          {t('login.noAccount')}
        </Typography>
        <TextLink to={routerPaths.SIGNUP}>{t('login.signupLink')}</TextLink>
      </div>
    </Form>
  );
};
