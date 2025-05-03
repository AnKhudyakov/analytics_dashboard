import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { countPercent, formatMetric } from 'shared/lib/helpers';
import { Card } from 'shared/ui/components/Card';
import { Chart } from 'shared/ui/components/Chart';
import { CustomBarChart } from 'shared/ui/components/CustomBarChart';
import { MetricInfo } from 'shared/ui/components/MetricInfo';
import { ChannelAnalyticsProps } from './ChannelAnalytics.def';
import { Container, Divider, FlexContainer } from './ChannelAnalytics.styles';

export const ChannelAnalytics: FC<ChannelAnalyticsProps> = ({ analytics }) => {
  const { t } = useTranslation();

  return (
    <>
      <Card className="sm:flex ">
        <Container>
          <MetricInfo
            title={t('shared.videos')}
            metric={formatMetric(analytics, 'videoCount')}
            percent={countPercent(analytics, 'videoCount').value}
            isPositive={countPercent(analytics, 'videoCount').isPositive}
          />
          <Chart
            data={analytics.filter((el) => el.dayOfWeek === 'MONDAY')}
            dataKeys={[{ field: 'videoCount', color: '#36C1F5' }]}
            legendLabels={{ videoCount: t('shared.videosCount') }}
            Yscale = "auto"
          />
        </Container>
        <Divider />
        <Container>
          <FlexContainer>
            <MetricInfo
              title={t('shared.subscribers')}
              metric={formatMetric(analytics, 'subscriberCount')}
              percent={countPercent(analytics, 'subscriberCount').value}
              isPositive={countPercent(analytics, 'subscriberCount').isPositive}
            />
            <MetricInfo
              title={t('shared.views')}
              metric={formatMetric(analytics, 'viewCount')}
              percent={countPercent(analytics, 'viewCount').value}
              isPositive={countPercent(analytics, 'viewCount').isPositive}
            />
          </FlexContainer>
          <Chart
            data={analytics}
            dataKeys={[
              { field: 'subscriberCount', color: '#05C168' },
              { field: 'viewCount', color: '#36C1F5' },
            ]}
            legendLabels={{
              subscriberCount: t('shared.subscribers'),
              viewCount: t('shared.views'),
            }}
            biaxial
          />
        </Container>
      </Card>
      <Card>
        <MetricInfo
          title={t('shared.revenue')}
          metric={formatMetric(analytics, 'estimatedRevenueUsd')}
          percent={countPercent(analytics, 'estimatedRevenueUsd').value}
          isPositive={countPercent(analytics, 'estimatedRevenueUsd').isPositive}
        />
        <CustomBarChart
          data={analytics.filter((el) => el.dayOfWeek === 'MONDAY')}
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
      </Card>
    </>
  );
};
