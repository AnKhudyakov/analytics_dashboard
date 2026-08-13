import { useTranslation } from 'react-i18next';

import { ChartFrame } from 'shared/ui/ChartFrame';
import { Skeleton } from 'shared/ui/Skeleton';

import {
  ChartRow,
  KpiRow,
  MapRow,
  Panel,
  SkeletonMap,
  SkeletonMapLegend,
  SkeletonPie,
  SkeletonPieCanvas,
  SkeletonPieLegend,
  SkeletonRoot,
  SkeletonTile,
  WidePanel,
} from './OverviewPage.styles';

const KPI_COUNT = 8;
const CHART_COUNT = 4;
const PIE_LEGEND_ROWS = 5;
const TITLE_HEIGHT = 20;
const HINT_HEIGHT = 16;
const TILE_LABEL_HEIGHT = 15;
const TILE_VALUE_HEIGHT = 28;
const LEGEND_HEIGHT = 16;
const PIE_LEGEND_HEIGHT = 20;

const range = (length: number) => Array.from({ length }, (_, index) => index);

export const OverviewSkeleton = () => {
  const { t } = useTranslation();

  return (
    <SkeletonRoot role="status" aria-label={t('shared.loading')}>
      <KpiRow>
        {range(KPI_COUNT).map((index) => (
          <SkeletonTile key={index}>
            <Skeleton width="80%" height={TILE_LABEL_HEIGHT} />
            <Skeleton width="55%" height={TILE_VALUE_HEIGHT} />
          </SkeletonTile>
        ))}
      </KpiRow>

      <MapRow>
        <WidePanel>
          <Skeleton width="35%" height={TITLE_HEIGHT} />
          <Skeleton width="60%" height={HINT_HEIGHT} />
          <SkeletonMap>
            <Skeleton
              height="auto"
              radius="0.75rem"
              className="aspect-[88/38]"
            />
            <SkeletonMapLegend>
              <Skeleton width={160} height={LEGEND_HEIGHT} />
            </SkeletonMapLegend>
          </SkeletonMap>
        </WidePanel>

        <Panel>
          <Skeleton width="55%" height={TITLE_HEIGHT} />
          <Skeleton width="85%" height={HINT_HEIGHT} />
          <SkeletonPie>
            <SkeletonPieCanvas>
              <Skeleton
                height="auto"
                radius="0.75rem"
                className="aspect-[32/22]"
              />
            </SkeletonPieCanvas>
            <SkeletonPieLegend>
              {range(PIE_LEGEND_ROWS).map((index) => (
                <Skeleton key={index} height={PIE_LEGEND_HEIGHT} />
              ))}
            </SkeletonPieLegend>
          </SkeletonPie>
        </Panel>
      </MapRow>

      <ChartRow>
        {range(CHART_COUNT).map((index) => (
          <Panel key={index}>
            <Skeleton width="60%" height={TITLE_HEIGHT} />
            <ChartFrame>
              <Skeleton height="100%" radius="0.75rem" />
            </ChartFrame>
          </Panel>
        ))}
      </ChartRow>
    </SkeletonRoot>
  );
};
