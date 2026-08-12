import { type FC } from 'react';

import { Typography } from 'shared/ui/Typography';

import { Container } from './WelcomeTitle.styles';

export interface WelcomeTitleProps {
  title: string;
  subtitle?: string;
  body?: string;
}

const HEADING_CLASS = '!text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl';

export const WelcomeTitle: FC<WelcomeTitleProps> = ({
  title,
  subtitle,
  body,
}) => (
  <Container>
    <Typography className={HEADING_CLASS} variant="title">
      {title}
    </Typography>
    {subtitle && (
      <Typography className={HEADING_CLASS} variant="title">
        {subtitle}
      </Typography>
    )}
    {body && (
      <Typography
        className="max-w-60 !text-sm text-secondary-font sm:max-w-full sm:!text-lg md:!text-xl lg:!text-2xl"
        variant="subtitle"
      >
        {body}
      </Typography>
    )}
  </Container>
);
