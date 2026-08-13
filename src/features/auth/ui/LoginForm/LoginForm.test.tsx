import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { useLocation } from 'react-router-dom';
import { makeToken } from 'test/msw/handlers';
import { server } from 'test/msw/server';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { config } from 'shared/config';

import { LoginForm } from './LoginForm';

const CurrentPath = () => <p>{useLocation().pathname}</p>;

const fillCredentials = async (
  user: ReturnType<typeof renderWithProviders>['user'],
  username: string,
  password: string
) => {
  await user.type(screen.getByLabelText('Username'), username);
  await user.type(screen.getByLabelText('Password'), password);
};

describe('LoginForm', () => {
  it('lands on the overview once the session is established', async () => {
    const { user } = renderWithProviders(
      <>
        <LoginForm />
        <CurrentPath />
      </>,
      { route: '/login' }
    );

    await fillCredentials(user, 'demo', 'secret123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('/overview')).toBeInTheDocument();
  });

  it('labels every field for assistive tech', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
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

  it('names every identity provider it offers', () => {
    renderWithProviders(<LoginForm />);

    expect(
      screen.getByRole('button', { name: 'Continue with Google' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue with LinkedIn' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue with Facebook' })
    ).toBeInTheDocument();
  });

  it('says so instead of failing silently while a provider is not wired up', async () => {
    const { user, store } = renderWithProviders(<LoginForm />);

    await user.click(
      screen.getByRole('button', { name: 'Continue with Google' })
    );

    expect(
      await screen.findByText('Social sign-in is not connected yet')
    ).toBeInTheDocument();
    expect(store.getState().session.token).toBeNull();
  });

  it('says so instead of failing silently on password recovery', async () => {
    const { user } = renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Forgot Password?' }));

    expect(
      await screen.findByText('Password recovery is not connected yet')
    ).toBeInTheDocument();
  });
  it('sends a wired provider to the api and leaves the rest inert', async () => {
    server.use(
      http.get(`${config.backendUrl}/auth/providers`, () =>
        HttpResponse.json({ google: true, linkedin: false, facebook: false })
      )
    );

    renderWithProviders(<LoginForm />, { route: '/login' });

    expect(
      await screen.findByRole('link', { name: 'Continue with Google' })
    ).toHaveAttribute('href', `${config.backendUrl}/auth/google`);
    expect(
      screen.getByRole('button', { name: 'Continue with LinkedIn' })
    ).toBeInTheDocument();
  });

  it('explains that a provider without credentials is not connected', async () => {
    const { user } = renderWithProviders(<LoginForm />, { route: '/login' });

    await user.click(
      screen.getByRole('button', { name: 'Continue with Google' })
    );

    expect(
      screen.getByText('Social sign-in is not connected yet')
    ).toBeInTheDocument();
  });

  it('opens a session from the token the provider redirect carries', async () => {
    const { store } = renderWithProviders(
      <>
        <LoginForm />
        <CurrentPath />
      </>,
      { route: `/login?token=${makeToken()}` }
    );

    expect(await screen.findByText('/overview')).toBeInTheDocument();
    expect(store.getState().session.token).not.toBeNull();
  });

  it('reports a failed provider redirect and drops the error from the url', async () => {
    renderWithProviders(
      <>
        <LoginForm />
        <CurrentPath />
      </>,
      { route: '/login?error=state' }
    );

    expect(
      await screen.findByText(/Social sign-in did not go through/)
    ).toBeInTheDocument();
    expect(screen.getByText('/login')).toBeInTheDocument();
  });
});
