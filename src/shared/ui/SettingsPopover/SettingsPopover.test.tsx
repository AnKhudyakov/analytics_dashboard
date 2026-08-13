import { screen, within } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { SettingsPopover } from './SettingsPopover';
import { SettingsLabel, SettingsRow } from './SettingsPopover.styles';

const renderPopover = () =>
  renderWithProviders(
    <SettingsPopover label="Settings">
      <SettingsRow>
        <SettingsLabel>Theme</SettingsLabel>
        <button type="button">Toggle theme</button>
      </SettingsRow>
    </SettingsPopover>
  );

describe('SettingsPopover', () => {
  it('keeps the controls behind the gear until it is opened', async () => {
    const { user } = renderPopover();

    const gear = screen.getByRole('button', { name: 'Settings' });

    expect(gear).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(gear);

    expect(gear).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(screen.getByRole('dialog', { name: 'Settings' })).getByRole(
        'button',
        { name: 'Toggle theme' }
      )
    ).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const { user } = renderPopover();

    await user.click(screen.getByRole('button', { name: 'Settings' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
