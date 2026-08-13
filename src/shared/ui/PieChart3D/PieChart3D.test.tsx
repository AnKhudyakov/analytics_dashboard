import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type Pie3DSlice, PieChart3D } from './PieChart3D';

const SLICES: Pie3DSlice[] = [
  { key: 'a', label: 'Entertainment', value: 500, color: '#184f95' },
  { key: 'b', label: 'Music', value: 300, color: '#256abf' },
  { key: 'c', label: 'Gaming', value: 200, color: '#3987e5' },
];

describe('PieChart3D', () => {
  it('labels every slice with its value and share', () => {
    render(<PieChart3D slices={SLICES} caption="Views by category" />);

    const legend = within(screen.getByRole('list'));

    expect(legend.getAllByRole('listitem')).toHaveLength(3);
    expect(legend.getByText('Entertainment')).toBeInTheDocument();
    expect(legend.getByText('50%')).toBeInTheDocument();
    expect(legend.getByText('30%')).toBeInTheDocument();
    expect(legend.getByText('20%')).toBeInTheDocument();
  });

  it('exposes the chart under its caption', () => {
    render(<PieChart3D slices={SLICES} caption="Views by category" />);

    expect(
      screen.getByRole('img', { name: 'Views by category' })
    ).toBeVisible();
  });

  it('survives a single slice covering the whole circle', () => {
    render(
      <PieChart3D
        slices={[{ key: 'only', label: 'All', value: 10, color: '#184f95' }]}
        caption="Views by category"
      />
    );

    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('keeps a zero total from producing NaN geometry', () => {
    render(
      <PieChart3D
        slices={[{ key: 'empty', label: 'None', value: 0, color: '#184f95' }]}
        caption="Views by category"
      />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
