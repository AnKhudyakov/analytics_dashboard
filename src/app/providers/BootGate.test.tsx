import { act, screen } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BootGate } from './BootGate';

const MIN_BOOT_MS = 1500;

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('BootGate', () => {
  it('holds the loader until the minimum boot time has passed', () => {
    vi.useFakeTimers();
    vi.spyOn(performance, 'now').mockReturnValue(0);

    renderWithProviders(
      <BootGate>
        <button type="button">Dashboard</button>
      </BootGate>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dashboard' })).toBeNull();

    act(() => {
      vi.advanceTimersByTime(MIN_BOOT_MS);
    });

    expect(
      screen.getByRole('button', { name: 'Dashboard' })
    ).toBeInTheDocument();
  });

  it('waits only for the time the boot has left', () => {
    vi.useFakeTimers();
    vi.spyOn(performance, 'now').mockReturnValue(MIN_BOOT_MS - 200);

    renderWithProviders(
      <BootGate>
        <button type="button">Dashboard</button>
      </BootGate>
    );

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(
      screen.getByRole('button', { name: 'Dashboard' })
    ).toBeInTheDocument();
  });

  it('shows no loader when booting already took longer than the hold', () => {
    vi.spyOn(performance, 'now').mockReturnValue(MIN_BOOT_MS * 2);

    renderWithProviders(
      <BootGate>
        <button type="button">Dashboard</button>
      </BootGate>
    );

    expect(
      screen.getByRole('button', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
