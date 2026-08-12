import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { LoginForm } from './LoginForm';

const fillCredentials = async (
  user: ReturnType<typeof renderWithProviders>['user'],
  username: string,
  password: string
) => {
  await user.type(screen.getByLabelText('Username'), username);
  await user.type(screen.getByLabelText('Password'), password);
};

describe('LoginForm', () => {
  it('labels every field for assistive tech', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  it('blocks submission and reports validation errors', async () => {
    const { user, store } = renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findAllByText('Field is required')).toHaveLength(2);
    expect(screen.getByLabelText('Username')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(store.getState().session.token).toBeNull();
  });

  it('rejects a password shorter than six characters', async () => {
    const { user } = renderWithProviders(<LoginForm />);

    await fillCredentials(user, 'demo', 'abc');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      await screen.findByText('Must be at least 6 characters')
    ).toBeInTheDocument();
  });

  it('stores the session when the credentials are accepted', async () => {
    const { user, store } = renderWithProviders(<LoginForm />);

    await fillCredentials(user, 'demo', 'password');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    await expect
      .poll(() => store.getState().session.token)
      .toEqual(expect.any(String));
    expect(store.getState().session.expiresAt).toBeGreaterThan(Date.now());
    expect(localStorage.getItem('token')).toEqual(
      store.getState().session.token
    );
  });

  it('keeps the token out of localStorage when "remember me" is off', async () => {
    const { user, store } = renderWithProviders(<LoginForm />);

    await user.click(screen.getByLabelText('Remember me'));
    await fillCredentials(user, 'demo', 'password');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    await expect
      .poll(() => store.getState().session.token)
      .toEqual(expect.any(String));
    expect(localStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('token')).toEqual(
      store.getState().session.token
    );
  });

  it('surfaces a rejected login without storing a session', async () => {
    const { user, store } = renderWithProviders(<LoginForm />);

    await fillCredentials(user, 'intruder', 'password');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      await screen.findByText('Incorrect username or password')
    ).toBeInTheDocument();
    expect(store.getState().session.token).toBeNull();
  });

  it('toggles password visibility', async () => {
    const { user } = renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password'
    );
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
  });
});
