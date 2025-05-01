import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'shared/api/auth_api';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Card } from 'shared/ui/components/Card';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { validationSchema } from '../lib/helpers';
import { Empty, ErrorText, Form, Link } from './LoginForm.styles';

export const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { remember: true },
  });

  const onSubmit = async (data: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    try {
      login(data)
        .unwrap()
        .then((response) => {
          if (data.remember) {
            localStorage.setItem('token', response.token);
          } else {
            sessionStorage.setItem('token', response.token);
          }
          navigate('/channels');
        });
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <Card className="max-w-100 sm:max-w-full">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="subtitle" className="w-full">
          {t('login.fromTitle')}
        </Typography>
        <Typography variant="body" className="w-full text-secondary-font mb-2">
          {t('login.fromSubtitle')}
        </Typography>
        <Input
          type="text"
          placeholder={t('login.plhUsername')}
          {...register('username')}
        />
        {errors.username ? (
          <ErrorText>{errors.username.message}</ErrorText>
        ) : (
          <Empty />
        )}
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={t('login.plhPassword')}
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
          type="checkbox"
          placeholder={t('login.remember')}
          checked={watch('remember')}
          {...register('remember')}
        />
        {error ? <ErrorText>{t('login.error')}</ErrorText> : <Empty />}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ButtonLoader width={20} height={20} />
          ) : (
            t('login.fromTitle')
          )}
        </Button>
        <div className="flex items-end gap-1">
          <Typography variant="body" className="text-secondary-font">
            {t('login.haveAcc')}
          </Typography>
          <Link to={'/signup'}>{t('login.linkSignup')}</Link>
        </div>
      </Form>
    </Card>
  );
};
