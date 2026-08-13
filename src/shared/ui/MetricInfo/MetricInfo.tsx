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
  trend?: Trend;
  compact?: boolean;
}

export const MetricInfo: FC<MetricInfoProps> = ({
  className,
  title,
  metric,
  trend,
  compact,
}) => {
  const Status = trend?.isPositive ? StatusPositive : StatusNegative;
  const TrendIcon = trend?.isPositive ? Icons.arrowGrow : Icons.arrowFall;

  return (
    <Container className={className} $compact={compact}>
      <Typography
        variant="subtitle"
        className={compact ? '!text-xs leading-tight !font-medium' : '!text-lg'}
      >
        {title}
      </Typography>
      <Content>
        <Typography variant="title" className={compact ? '!text-lg' : ''}>
          {metric}
        </Typography>
        {trend && (
          <Status>
            <StyledTypography>{trend.value}%</StyledTypography>
            <TrendIcon width={9} height={9} aria-hidden />
          </Status>
        )}
      </Content>
    </Container>
  );
};
