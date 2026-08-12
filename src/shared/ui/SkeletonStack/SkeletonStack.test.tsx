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
      screen.getByRole('status').querySelectorAll('.skeleton')
    );

    expect(blocks.map((block) => block.getAttribute('style'))).toEqual([
      'width: 100%; height: 120px; border-radius: 0.5rem;',
      'width: 100%; height: 240px; border-radius: 0.5rem;',
    ]);
  });
});
