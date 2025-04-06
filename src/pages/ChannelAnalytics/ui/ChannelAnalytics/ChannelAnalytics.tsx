import { useGetChannelStatsQuery } from 'entities/channel';
import { countPercent, formatMetric } from 'pages/ChannelAnalytics/lib/helpers';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'shared/ui/components/Card';
import { Chart } from 'shared/ui/components/Chart';
import { CustomBarChart } from 'shared/ui/components/CustomBarChart';
import { Error } from 'shared/ui/components/Error';
import { Loader } from 'shared/ui/components/Loader';
import { MetricInfo } from 'shared/ui/components/MetricInfo';
import { ChannelAnalyticsProps } from './ChannelAnalytics.def';
import { channelDetailAnalytics } from './ChannelAnalytics.mother';
import { Container, Divider, FlexContainer } from './ChannelAnalytics.styles';

export const ChannelAnalytics: FC<ChannelAnalyticsProps> = ({ username }) => {
  const { channelId } = useParams<{ channelId: string }>();
  const { data, isLoading, error } = useGetChannelStatsQuery(channelId, {
    skip: Boolean(!channelId),
  });

  if (isLoading) return <Loader />;
  if (error || !data) return <Error text="Error data loading" />;
  const analytics = data || channelDetailAnalytics;

  return (
    <>
      <Card flex>
        <Container>
          <MetricInfo
            title="Videos"
            metric={formatMetric(analytics, 'videoCount')}
            percent={countPercent(analytics, 'videoCount').value}
            isPositive={countPercent(analytics, 'videoCount').isPositive}
          />
          <Chart
            data={analytics.filter((el) => el.dayOfWeek === 'MONDAY')}
            dataKeys={[{ field: 'videoCount', color: '#36C1F5' }]}
            legendLabels={{ videoCount: 'Videos count' }}
            log
          />
        </Container>
        <Divider />
        <Container>
          <FlexContainer>
            <MetricInfo
              title="Subscribers"
              metric={formatMetric(analytics, 'subscriberCount')}
              percent={countPercent(analytics, 'subscriberCount').value}
              isPositive={countPercent(analytics, 'subscriberCount').isPositive}
            />
            <MetricInfo
              title="Views"
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
              subscriberCount: 'Subscribers',
              viewCount: 'Views',
            }}
            biaxial
          />
        </Container>
      </Card>
      <Card>
        <MetricInfo
          title="Estimated Revenue"
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
            estimatedRevenueUsd: 'Revenue',
            estimatedLowRevenueUsd: 'Low Revenue',
            estimatedHighRevenueUsd: 'High Revenue',
          }}
        />
      </Card>
    </>
  );
};
