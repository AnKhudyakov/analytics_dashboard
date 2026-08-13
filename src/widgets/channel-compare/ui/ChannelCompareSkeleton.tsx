import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartFrame } from 'shared/ui/ChartFrame';
import { Skeleton } from 'shared/ui/Skeleton';

import {
  Card,
  CardRow,
  Grid,
  MetricRow,
  Panel,
  Row,
  SkeletonPie,
  SkeletonPieCanvas,
  SkeletonPieLegend,
  SkeletonRows,
  SmallRow,
  WidePanel,
} from './ChannelCompare.styles';

const METRIC_COUNT = 4;
const DEFAULT_CHANNELS = 4;
const BUTTON_HEIGHT = 30;
const TITLE_HEIGHT = 20;
const HINT_HEIGHT = 16;
const NARROW_HINT_HEIGHT = 32;
const HEAD_HEIGHT = 28;
const VALUE_HEIGHT = 28;
const META_HEIGHT = 16;
const PIE_LEGEND_HEIGHT = 20;
const BAR_HEIGHT = 26;

const range = (length: number) => Array.from({ length }, (_, index) => index);

export interface ChannelCompareSkeletonProps {
  count?: number;
}

export const ChannelCompareSkeleton: FC<ChannelCompareSkeletonProps> = ({
  count = DEFAULT_CHANNELS,
}) => {
  const { t } = useTranslation();

  return (
    <Grid role="status" aria-label={t('shared.loading')}>
      <MetricRow>
        {range(METRIC_COUNT).map((index) => (
          <Skeleton
            key={index}
            width={92}
            height={BUTTON_HEIGHT}
            radius="0.375rem"
          />
        ))}
      </MetricRow>

      <CardRow>
        {range(count).map((index) => (
          <Card key={index}>
            <Skeleton width="70%" height={HEAD_HEIGHT} />
            <Skeleton width="45%" height={VALUE_HEIGHT} />
            <Skeleton width="60%" height={META_HEIGHT} />
            <Skeleton width="25%" height={META_HEIGHT} />
          </Card>
        ))}
      </CardRow>

      <Row>
        <WidePanel>
          <Skeleton width="45%" height={TITLE_HEIGHT} />
          <Skeleton width="80%" height={HINT_HEIGHT} />
          <ChartFrame>
            <Skeleton height="100%" radius="0.75rem" />
          </ChartFrame>
        </WidePanel>

        <Panel>
          <Skeleton width="60%" height={TITLE_HEIGHT} />
          <Skeleton height={NARROW_HINT_HEIGHT} />
          <SkeletonPie>
            <SkeletonPieCanvas>
              <Skeleton
                height="auto"
                radius="0.75rem"
                className="aspect-[32/22]"
              />
            </SkeletonPieCanvas>
            <SkeletonPieLegend>
              <Skeleton height={PIE_LEGEND_HEIGHT} />
              <Skeleton height={PIE_LEGEND_HEIGHT} />
            </SkeletonPieLegend>
          </SkeletonPie>
        </Panel>

        <Panel>
          <Skeleton width="60%" height={TITLE_HEIGHT} />
          <Skeleton height={NARROW_HINT_HEIGHT} />
          <SkeletonRows>
            {range(count).map((index) => (
              <Skeleton key={index} height={BAR_HEIGHT} />
            ))}
          </SkeletonRows>
        </Panel>
      </Row>

      <Skeleton width={200} height={TITLE_HEIGHT} />

      <SmallRow>
        {range(count).map((index) => (
          <Panel key={index}>
            <Skeleton width="70%" height={TITLE_HEIGHT} />
            <Skeleton width="40%" height={HINT_HEIGHT} />
            <ChartFrame size="sm">
              <Skeleton height="100%" radius="0.75rem" />
            </ChartFrame>
          </Panel>
        ))}
      </SmallRow>
    </Grid>
  );
};
