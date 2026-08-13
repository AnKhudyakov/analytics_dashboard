import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('boots and sends an anonymous visitor to the login screen', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Login' }, { timeout: 4000 })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
});
