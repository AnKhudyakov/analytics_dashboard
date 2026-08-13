import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  type TrackedChannel,
  useGetProfileQuery,
  useTrackCompetitorMutation,
  useUntrackCompetitorMutation,
} from 'entities/profile';
import { routerPaths } from 'shared/constants';
import { compactNumber } from 'shared/lib/formatters';
import { proxiedImageUrl } from 'shared/lib/images';
import { Button } from 'shared/ui/Button';
import { Error } from 'shared/ui/Error';
import { Input } from 'shared/ui/Input';
import { LazyImage } from 'shared/ui/LazyImage';
import { Typography } from 'shared/ui/Typography';

import {
  Avatar,
  CardTitle,
  Container,
  Field,
  FieldLabel,
  FieldValue,
  Grid,
  Notice,
  Panel,
  Row,
  RowMeta,
  RowStats,
  RowTitle,
  Stack,
} from './ProfilePage.styles';
import { ProfileSkeleton } from './ProfileSkeleton';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
  const [track, trackState] = useTrackCompetitorMutation();
  const [untrack] = useUntrackCompetitorMutation();
  const [channelId, setChannelId] = useState('');

  if (isLoading) {
    return (
      <Container>
        <Typography variant="title">{t('profile.title')}</Typography>
        <ProfileSkeleton />
      </Container>
    );
  }

  if (isError || !profile) {
    return (
      <Container>
        <Typography variant="title">{t('profile.title')}</Typography>
        <Panel>
          <Error
            text={t('shared.errorLoading')}
            onRetry={() => void refetch()}
          />
        </Panel>
      </Container>
    );
  }

  const onTrack = async () => {
    const id = channelId.trim();
    if (!id) return;
    const result = await track(id);
    if (!('error' in result)) setChannelId('');
  };

  const renderChannel = (channel: TrackedChannel, onRemove?: () => void) => (
    <Row key={channel.id}>
      {channel.thumbnail && (
        <Avatar>
          <LazyImage src={proxiedImageUrl(channel.thumbnail)} alt="" />
        </Avatar>
      )}
      <RowMeta>
        <RowTitle to={`${routerPaths.CHANNELS}/${channel.id}`}>
          {channel.title}
        </RowTitle>
        <RowStats>
          {compactNumber(channel.subscribers)} {t('columns.subscribers')} ·{' '}
          {compactNumber(channel.views)} {t('columns.views')}
          {channel.country ? ` · ${channel.country}` : ''}
        </RowStats>
      </RowMeta>
      {onRemove && (
        <Button
          icon
          aria-label={t('profile.untrack', { channel: channel.title })}
          onClick={onRemove}
        >
          ✕
        </Button>
      )}
    </Row>
  );

  return (
    <Container>
      <Typography variant="title">{t('profile.title')}</Typography>

      <Grid>
        <Panel>
          <CardTitle>{t('profile.account')}</CardTitle>
          <Stack>
            <Field>
              <FieldLabel>{t('profile.displayName')}</FieldLabel>
              <FieldValue>{profile.displayName}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>{t('profile.email')}</FieldLabel>
              <FieldValue>{profile.email}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>{t('profile.role')}</FieldLabel>
              <FieldValue>{profile.role}</FieldValue>
            </Field>
          </Stack>

          <CardTitle className="mt-6">{t('profile.myChannel')}</CardTitle>
          {profile.channel ? (
            <Stack>{renderChannel(profile.channel)}</Stack>
          ) : (
            <Notice>{t('profile.noChannel')}</Notice>
          )}
        </Panel>

        <Panel>
          <CardTitle>{t('profile.competitors')}</CardTitle>
          <Notice>{t('profile.competitorsHint')}</Notice>

          <Stack>
            {profile.competitors.length === 0 && (
              <Notice>{t('profile.noCompetitors')}</Notice>
            )}
            {profile.competitors.map((channel) =>
              renderChannel(channel, () => void untrack(channel.id))
            )}
          </Stack>

          <Stack>
            <Input
              label={t('profile.addCompetitor')}
              hideLabel={false}
              placeholder={t('profile.channelIdPlaceholder')}
              value={channelId}
              error={
                trackState.isError ? t('profile.addCompetitorError') : undefined
              }
              onChange={(event) => setChannelId(event.target.value)}
            />
            <Button
              fullWidth
              disabled={!channelId.trim() || trackState.isLoading}
              onClick={() => void onTrack()}
            >
              {t('profile.addCompetitor')}
            </Button>
            <Notice>
              <Link to={routerPaths.CHANNELS} className="underline">
                {t('profile.browseChannels')}
              </Link>
            </Notice>
          </Stack>
        </Panel>
      </Grid>
    </Container>
  );
};
