import { FC } from 'react';
import { Typography } from '../Typography';
import { WelcomeTitleProps } from './WelcomeTitle.def';
import { Container } from './WelcomeTitle.styles';

export const WelcomeTitle: FC<WelcomeTitleProps> = ({
  title,
  subtitle,
  body,
}) => {
  return (
    <Container>
      <Typography className={'!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl'} variant="title">
        {title}
      </Typography>
      <Typography className={'!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl'} variant="title">
        {subtitle}
      </Typography>
      <Typography
        className={'sm:!text-lg  md:!text-xl lg:!text-2xl text-neutral-400'}
        variant="subtitle"
      >
        {body}
      </Typography>
    </Container>
  );
};
