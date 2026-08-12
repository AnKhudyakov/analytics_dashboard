import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from 'shared/constants';
import { Button } from 'shared/ui/Button';
import { ButtonLoader } from 'shared/ui/ButtonLoader';
import { Card } from 'shared/ui/Card';
import { Icons } from 'shared/ui/icons';
import { Input } from 'shared/ui/Input';
import { Typography } from 'shared/ui/Typography';

import { useSignupMutation } from '../../api/authApi';
import { type SignupFormValues, signupSchema } from '../../model/validation';
import { ErrorText, Form, TextLink } from '../LoginForm/LoginForm.styles';

export const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signup, { isLoading, isError }] = useSignupMutation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    try {
      await signup({ username, email, password }).unwrap();
      void navigate(routerPaths.LOGIN, { replace: true });
    } catch {
      // error state is rendered from the mutation below
    }
  });

  return (
    <Card className="max-w-100 sm:max-w-full">
      <Form onSubmit={(event) => void onSubmit(event)} noValidate>
        <Typography variant="subtitle" className="w-full">
          {t('signup.formTitle')}
        </Typography>
        <Typography variant="body" className="mb-2 w-full text-secondary-font">
          {t('signup.formSubtitle')}
        </Typography>

        <Input
          label={t('signup.username')}
          placeholder={t('signup.username')}
          autoComplete="username"
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          type="email"
          label={t('signup.email')}
          placeholder={t('signup.email')}
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          label={t('signup.password')}
          placeholder={t('signup.password')}
          autoComplete="new-password"
          error={errors.password?.message}
          endIcon={
            isPasswordVisible ? <Icons.hidePassword /> : <Icons.showPassword />
          }
          endIconLabel={
            isPasswordVisible
              ? t('login.hidePassword')
              : t('login.showPassword')
          }
          onEndIconClick={() => setPasswordVisible((visible) => !visible)}
          {...register('password')}
        />
        <Input
          type={isConfirmVisible ? 'text' : 'password'}
          label={t('signup.confirmPassword')}
          placeholder={t('signup.confirmPassword')}
          autoComplete="new-password"
          error={errors.passwordConfirmation?.message}
          endIcon={
            isConfirmVisible ? <Icons.hidePassword /> : <Icons.showPassword />
          }
          endIconLabel={
            isConfirmVisible ? t('login.hidePassword') : t('login.showPassword')
          }
          onEndIconClick={() => setConfirmVisible((visible) => !visible)}
          {...register('passwordConfirmation')}
        />

        <ErrorText role="alert">{isError ? t('signup.error') : ''}</ErrorText>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ButtonLoader width={20} height={20} aria-hidden />
          ) : (
            t('signup.formTitle')
          )}
        </Button>

        <div className="flex items-end gap-1">
          <Typography variant="body" className="text-secondary-font">
            {t('signup.haveAccount')}
          </Typography>
          <TextLink to={routerPaths.LOGIN}>{t('signup.loginLink')}</TextLink>
        </div>
      </Form>
    </Card>
  );
};
