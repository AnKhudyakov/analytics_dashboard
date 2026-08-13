import { act, screen, within } from '@testing-library/react';
import i18n from 'i18next';
import { renderWithProviders } from 'test/renderWithProviders';
import { afterEach, describe, expect, it } from 'vitest';

import { LanguageSwitcher } from './LanguageSwitcher';

const withLanguage = async (code: string) => {
  await act(async () => {
    await i18n.changeLanguage(code);
  });
};

afterEach(async () => {
  await withLanguage('en');
});

describe('LanguageSwitcher', () => {
  it('lists every language at once in the inline variant', () => {
    renderWithProviders(<LanguageSwitcher inline />);

    const options = within(
      screen.getByRole('list', { name: 'Change language' })
    ).getAllByRole('button');

    expect(options.map((option) => option.textContent)).toEqual([
      'En',
      'Ru',
      'Fr',
    ]);
  });

  it('marks the active language and switches on click', async () => {
    const { user } = renderWithProviders(<LanguageSwitcher inline />);

    expect(screen.getByRole('button', { name: 'En' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Ru' }));
    });

    expect(screen.getByRole('button', { name: 'Ru' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(i18n.language).toBe('ru');
  });
});
