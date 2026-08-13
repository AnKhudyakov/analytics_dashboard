import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { SkeletonStack } from './SkeletonStack';

describe('SkeletonStack', () => {
  it('announces the loading state once, not once per block', () => {
    renderWithProviders(<SkeletonStack heights={[280, 406, 392]} />);

    const status = screen.getByRole('status', { name: 'Loading' });
    expect(status).toBeInTheDocument();
    expect(status.children).toHaveLength(3);
  });

  it('sizes each block from the given heights', () => {
    renderWithProviders(<SkeletonStack heights={[120, 240]} />);

    const blocks = Array.from(
      screen.getByRole('status').querySelectorAll<HTMLElement>('.skeleton')
    );

    expect(blocks.map((block) => block.style.height)).toEqual([
      '120px',
      '240px',
    ]);
    expect(blocks.every((block) => block.style.width === '100%')).toBe(true);
  });

  it('rounds every block with the shared panel radius so it matches the cards', () => {
    renderWithProviders(<SkeletonStack heights={[120, 240]} />);

    const radii = Array.from(
      screen.getByRole('status').querySelectorAll<HTMLElement>('.skeleton')
    ).map((block) => block.style.borderRadius);

    expect(new Set(radii)).toEqual(new Set(['var(--radius-panel)']));
  });
});
