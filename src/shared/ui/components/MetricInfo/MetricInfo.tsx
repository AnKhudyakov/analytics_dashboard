import { FC } from 'react';
import { Icons } from 'shared/ui/icons';
import { Typography } from '../Typography';
import { MetricInfoProps } from './MetricInfo.def';
import {
  Container,
  Content,
  StatusNegative,
  StatusPositive,
  StyledTypography,
} from './MetricInfo.styles';

export const MetricInfo: FC<MetricInfoProps> = ({
  className,
  title,
  metric,
  percent,
  isPositive,
}) => {
  return (
    <Container className={className}>
      <Typography variant="body">{title}</Typography>
      <Content>
        <Typography variant="title">{metric}</Typography>
        {isPositive ? (
          <StatusPositive>
            <StyledTypography>{percent}%</StyledTypography>
            <Icons.arrowGrow width={9} height={9} />
          </StatusPositive>
        ) : (
          <StatusNegative>
            <StyledTypography>{percent}%</StyledTypography>
            <Icons.arrowFall width={9} height={9} />
          </StatusNegative>
        )}
      </Content>
    </Container>
  );
};
