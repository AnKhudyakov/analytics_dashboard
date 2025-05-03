import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { countPercent, formatMetric } from 'shared/lib/helpers';
import { Card } from 'shared/ui/components/Card';
import { Chart } from 'shared/ui/components/Chart';
import { CustomBarChart } from 'shared/ui/components/CustomBarChart';
import { MetricInfo } from 'shared/ui/components/MetricInfo';
import { VideoAnalyticsProps } from './VideoAnalytics.def';
import { Container, Divider, FlexContainer } from './VideoAnalytics.styles';

export const VideoAnalytics: FC<VideoAnalyticsProps> = ({ analytics }) => {
  const { t } = useTranslation();

  const percentRollingRevenue = countPercent(analytics, 'rollingRevenue');

  return (
    <>
      <Card className="sm:flex ">
        <Container>
          <MetricInfo
            title={t('shared.rollingRevenue')}
            metric={formatMetric(analytics, 'rollingRevenue')}
            percent={percentRollingRevenue.value}
            isPositive={percentRollingRevenue.isPositive}
          />
          <Chart
            data={analytics}
            dataKeys={[
              { field: 'rollingRevenue', color: '#3C87E9' },
              { field: 'rollingLowRevenue', color: '#36C1F5' },
              { field: 'rollingHighRevenue', color: '#05C168' },
            ]}
            legendLabels={{
              rollingRevenue: t('shared.rollingRevenue'),
              rollingLowRevenue: t('shared.rollingLowRevenue'),
              rollingHighRevenue: t('shared.rollingHighRevenue'),
            }}
          />
        </Container>
        <Divider />
        <Container>
          <MetricInfo
            title={t('shared.revenue')}
            metric={formatMetric(analytics, 'estimatedRevenueUsd')}
            percent={countPercent(analytics, 'estimatedRevenueUsd').value}
            isPositive={
              countPercent(analytics, 'estimatedRevenueUsd').isPositive
            }
          />
          <CustomBarChart
            data={analytics}
            dataKeys={[
              { field: 'estimatedRevenueUsd', color: '#36C1F5' },
              { field: 'estimatedLowRevenueUsd', color: '#3C87E9' },
              { field: 'estimatedHighRevenueUsd', color: '#05C168' },
            ]}
            legendLabels={{
              estimatedRevenueUsd: t('shared.revenue'),
              estimatedLowRevenueUsd: t('shared.lowRevenue'),
              estimatedHighRevenueUsd: t('shared.highRevenue'),
            }}
          />
        </Container>
      </Card>
      <Card>
        <FlexContainer>
          <MetricInfo
            title={t('shared.views')}
            metric={formatMetric(analytics, 'viewCount')}
            percent={countPercent(analytics, 'viewCount').value}
            isPositive={countPercent(analytics, 'viewCount').isPositive}
          />
        </FlexContainer>
        <Chart
          data={analytics}
          dataKeys={[{ field: 'viewCount', color: '#36C1F5' }]}
          legendLabels={{ viewCount: t('shared.views') }}
          Yscale="auto"
        />
      </Card>
    </>
  );
};
