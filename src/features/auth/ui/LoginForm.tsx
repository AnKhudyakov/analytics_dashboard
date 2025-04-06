// features/auth/ui/LoginForm.tsx
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'shared/api/auth_api';
import { Card } from 'shared/ui/components/Card';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { Empty, ErrorText, Form } from './LoginForm.styles';
import { Button } from 'shared/ui/components/Button';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem('token', response.token);
      navigate('/channels');
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <Card className="max-w-100 drop-shadow-3">
      <Form onSubmit={handleSubmit}>
        <Typography variant="subtitle">Login</Typography>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <ErrorText>Incorrect login</ErrorText> : <Empty />}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Please waiting...' : 'Login'}
        </Button>
      </Form>
    </Card>
  );
};
