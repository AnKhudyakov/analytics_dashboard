import { type FC } from 'react';

import { type Trend } from 'shared/lib/formatters';
import { Icons } from 'shared/ui/icons';
import { Typography } from 'shared/ui/Typography';

import {
  Container,
  Content,
  StatusNegative,
  StatusPositive,
  StyledTypography,
} from './MetricInfo.styles';

export interface MetricInfoProps {
  className?: string;
  title: string;
  metric: string;
  trend: Trend;
}

export const MetricInfo: FC<MetricInfoProps> = ({
  className,
  title,
  metric,
  trend,
}) => {
  const Status = trend.isPositive ? StatusPositive : StatusNegative;
  const TrendIcon = trend.isPositive ? Icons.arrowGrow : Icons.arrowFall;

  return (
    <Container className={className}>
      <Typography variant="subtitle" className="!text-lg">
        {title}
      </Typography>
      <Content>
        <Typography variant="title">{metric}</Typography>
        <Status>
          <StyledTypography>{trend.value}%</StyledTypography>
          <TrendIcon width={9} height={9} aria-hidden />
        </Status>
      </Content>
    </Container>
  );
};
