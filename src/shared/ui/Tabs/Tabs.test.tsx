import { screen, within } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './Tabs';

const TABS = [
  { id: 'subscribers', label: 'Subscribers' },
  { id: 'views', label: 'Views' },
  { id: 'revenue', label: 'Revenue', disabled: true },
] as const;

const renderTabs = (active: 'subscribers' | 'views' | 'revenue' = 'views') => {
  const onChange = vi.fn();

  return {
    onChange,
    ...renderWithProviders(
      <Tabs tabs={TABS} active={active} onChange={onChange} label="Metric" />
    ),
  };
};

describe('Tabs', () => {
  it('marks only the active tab as pressed', () => {
    renderTabs();

    const group = within(screen.getByRole('group', { name: 'Metric' }));

    expect(group.getByRole('button', { name: 'Views' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(group.getByRole('button', { name: 'Subscribers' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('slides the indicator to the active tab', () => {
    const { container } = renderTabs();
    const indicator = container.querySelector<HTMLElement>('[aria-hidden]');

    if (!indicator) throw new Error('Tabs rendered no indicator');

    expect(indicator.style.width).toBe(`${100 / TABS.length}%`);
    expect(indicator.style.transform).toBe('translateX(100%)');
  });

  it('reports the picked tab and ignores a disabled one', async () => {
    const { onChange, user } = renderTabs();

    await user.click(screen.getByRole('button', { name: 'Subscribers' }));
    expect(onChange).toHaveBeenCalledWith('subscribers');

    await user.click(screen.getByRole('button', { name: 'Revenue' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
