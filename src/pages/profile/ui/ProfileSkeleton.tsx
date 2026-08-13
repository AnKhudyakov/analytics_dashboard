import { useTranslation } from 'react-i18next';

import { Skeleton } from 'shared/ui/Skeleton';

import { Avatar, Grid, Panel, Row, RowMeta, Stack } from './ProfilePage.styles';

const FIELD_COUNT = 3;
const COMPETITOR_COUNT = 3;
const TITLE_HEIGHT = 20;
const FIELD_HEIGHT = 16;
const ROW_TITLE_HEIGHT = 20;
const INPUT_HEIGHT = 82;
const BUTTON_HEIGHT = 40;

const range = (length: number) => Array.from({ length }, (_, index) => index);

const ChannelRow = () => (
  <Row>
    <Avatar>
      <Skeleton height="100%" radius="50%" />
    </Avatar>
    <RowMeta>
      <Skeleton width="55%" height={ROW_TITLE_HEIGHT} />
      <Skeleton width="80%" height={FIELD_HEIGHT} />
    </RowMeta>
  </Row>
);

export const ProfileSkeleton = () => {
  const { t } = useTranslation();

  return (
    <Grid role="status" aria-label={t('shared.loading')}>
      <Panel>
        <Skeleton width="35%" height={TITLE_HEIGHT} />
        <Stack>
          {range(FIELD_COUNT).map((index) => (
            <Skeleton key={index} height={FIELD_HEIGHT} />
          ))}
        </Stack>

        <Skeleton width="40%" height={TITLE_HEIGHT} className="mt-6" />
        <Stack>
          <ChannelRow />
        </Stack>
      </Panel>

      <Panel>
        <Skeleton width="45%" height={TITLE_HEIGHT} />
        <Skeleton width="75%" height={FIELD_HEIGHT} />

        <Stack>
          {range(COMPETITOR_COUNT).map((index) => (
            <ChannelRow key={index} />
          ))}
        </Stack>

        <Stack>
          <Skeleton height={INPUT_HEIGHT} />
          <Skeleton height={BUTTON_HEIGHT} radius="0.5rem" />
          <Skeleton width="40%" height={FIELD_HEIGHT} />
        </Stack>
      </Panel>
    </Grid>
  );
};
