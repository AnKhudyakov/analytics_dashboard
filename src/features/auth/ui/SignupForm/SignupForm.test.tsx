import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { SignupForm } from './SignupForm';

const CurrentPath = () => <p>{useLocation().pathname}</p>;

const fillForm = async (
  user: ReturnType<typeof renderWithProviders>['user'],
  username: string
) => {
  await user.type(screen.getByLabelText('Username'), username);
  await user.type(screen.getByLabelText('Email'), `${username}@example.com`);
  await user.type(screen.getByLabelText('Password'), 'secret123');
  await user.type(screen.getByLabelText('Confirm password'), 'secret123');
  await user.click(screen.getByRole('button', { name: 'Signup' }));
};

describe('SignupForm', () => {
  it('sends a new account to the login screen', async () => {
    const { user } = renderWithProviders(
      <>
        <SignupForm />
        <CurrentPath />
      </>,
      { route: '/signup' }
    );

    await fillForm(user, 'newcomer');

    expect(await screen.findByText('/login')).toBeInTheDocument();
  });

  it('says so when the username is already registered', async () => {
    const { user } = renderWithProviders(
      <>
        <SignupForm />
        <CurrentPath />
      </>,
      { route: '/signup' }
    );

    await fillForm(user, 'taken');

    expect(
      await screen.findByText('That username or email is already registered')
    ).toBeInTheDocument();
    expect(screen.getByText('/signup')).toBeInTheDocument();
  });
});
