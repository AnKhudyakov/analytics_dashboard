import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AvatarInfo } from './AvatarInfo';

const imageOf = (container: HTMLElement): HTMLImageElement => {
  const image = container.querySelector('img');
  if (!image) throw new Error('AvatarInfo rendered no image');
  return image;
};

describe('AvatarInfo', () => {
  it('holds a skeleton in place until the avatar has loaded', () => {
    const { container } = render(
      <AvatarInfo src="https://example.test/a.jpg" name="ACG" />
    );

    expect(container.querySelector('.skeleton')).toBeInTheDocument();

    fireEvent.load(imageOf(container));

    expect(container.querySelector('.skeleton')).not.toBeInTheDocument();
    expect(screen.getByText('ACG')).toBeInTheDocument();
  });

  it('drops the avatar but keeps the name when the image fails', () => {
    const { container } = render(
      <AvatarInfo src="https://example.test/missing.jpg" name="ACG" />
    );

    fireEvent.error(imageOf(container));

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByText('ACG')).toBeInTheDocument();
  });
});
