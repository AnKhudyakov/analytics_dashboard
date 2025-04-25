import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from 'shared/api/auth_api';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Card } from 'shared/ui/components/Card';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { validationSignupSchema } from '../lib/helpers';
import { Container, Empty, ErrorText, Form, Link } from './SingupForm.styles';

export const SingupForm = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSignupSchema),
  });

  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      signup(data)
        .unwrap()
        .then((response) => {
          navigate('/login');
        });
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <Container>
      <Card className="max-w-100">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle" className="w-full">
            {t('singup.fromTitle')}
          </Typography>
          <Typography
            variant="body"
            className="w-full text-secondary-font mb-2"
          >
            {t('singup.fromSubtitle')}
          </Typography>
          <Input
            type="text"
            placeholder={t('singup.plhUsername')}
            {...register('username')}
          />
          {errors.username ? (
            <ErrorText>{errors.username.message}</ErrorText>
          ) : (
            <Empty />
          )}
          <Input
            type="text"
            placeholder={t('singup.plhEmail')}
            {...register('email')}
          />
          {errors.email ? (
            <ErrorText>{errors.email.message}</ErrorText>
          ) : (
            <Empty />
          )}
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('singup.plhPassword')}
            endIcon={
              showPassword ? <Icons.hidePassword /> : <Icons.showPassword />
            }
            onEndIconClick={() => setShowPassword((prev) => !prev)}
            {...register('password')}
          />
          {errors.password ? (
            <ErrorText>{errors.password.message}</ErrorText>
          ) : (
            <Empty />
          )}
          <Input
            type={showConfirm ? 'text' : 'password'}
            placeholder={t('singup.plhConfirmPassword')}
            endIcon={
              showConfirm ? <Icons.hidePassword /> : <Icons.showPassword />
            }
            onEndIconClick={() => setShowConfirm((prev) => !prev)}
            {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation ? (
            <ErrorText>{errors.passwordConfirmation.message}</ErrorText>
          ) : (
            <Empty />
          )}
          {error ? <ErrorText>{t('singup.error')}</ErrorText> : <Empty />}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <ButtonLoader width={20} height={20} />
            ) : (
              t('singup.fromTitle')
            )}
          </Button>
          <div className="flex items-end gap-1">
            <Typography variant="body" className="text-secondary-font">
              {t('singup.haveAcc')}
            </Typography>
            <Link to={'/login'}>{t('singup.linkSignup')}</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
