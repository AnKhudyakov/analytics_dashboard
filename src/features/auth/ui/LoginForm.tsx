import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'shared/api/auth_api';
import { Button } from 'shared/ui/components/Button';
import { Card } from 'shared/ui/components/Card';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { validationSchema } from '../lib/helpers';
import { ButtonLoader, Empty, ErrorText, Form } from './LoginForm.styles';

export const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const response = await login(data).unwrap();
      localStorage.setItem('token', response.token);
      navigate('/channels');
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <Card className="max-w-100 drop-shadow-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="subtitle">Login</Typography>
        <Input type="text" placeholder="Username" {...register('username')} />
        {errors.username ? (
          <ErrorText>{errors.username.message}</ErrorText>
        ) : (
          <Empty />
        )}
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password ? (
          <ErrorText>{errors.password.message}</ErrorText>
        ) : (
          <Empty />
        )}
        {error ? <ErrorText>Incorrect login</ErrorText> : <Empty />}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ButtonLoader width={20} height={20} /> : 'Login'}
        </Button>
      </Form>
    </Card>
  );
};
