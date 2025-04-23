import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'shared/api/auth_api';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Card } from 'shared/ui/components/Card';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { validationSchema } from '../lib/helpers';
import { Container, Empty, ErrorText, Form, Link } from './LoginForm.styles';

export const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    <Container>
      <Card className="max-w-100">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle" className="w-full">
            Login
          </Typography>
          <Typography
            variant="body"
            className="w-full text-secondary-font mb-2"
          >
            Please enter you’re credentials
          </Typography>
          <Input type="text" placeholder="Username" {...register('username')} />
          {errors.username ? (
            <ErrorText>{errors.username.message}</ErrorText>
          ) : (
            <Empty />
          )}
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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
            placeholder="Remember me"
            checked={watch('remember')}
            {...register('remember')}
          />
          {error ? <ErrorText>Incorrect login</ErrorText> : <Empty />}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <ButtonLoader width={20} height={20} /> : 'Login'}
          </Button>
          <div className="flex items-end gap-1">
            <Typography variant="body" className="text-secondary-font">
              Don’t have an account?
            </Typography>
            <Link to={'/signup'}>Signup</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
