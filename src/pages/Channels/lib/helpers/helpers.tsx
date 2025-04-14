import { Channel, ColumnChannel } from 'entities/channel/model/types';
import { ReactNode } from 'react';
import { Filter } from 'shared/api/types';
import { config } from 'shared/config';
import { formatStatistic } from 'shared/lib/helpers';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';
import { Icons } from 'shared/ui/icons';

type Formatter = (data?: Channel[]) => (string | number | ReactNode)[];

export const formatChannels = (data: Channel[] | undefined) => {
  const count = data?.length ?? 0;
  const ids = data?.map((el) => el.id) ?? [];

  const items = Object.entries(ColumnChannel).map(([key, title]) => {
    const formatter = formatChannelValues[key];
    const values = formatter?.format(data) ?? formatNumberValues(data, key);
    const filterType =
      formatter?.filterType ??
      ((formatter ? undefined : 'range') as Filter['filterType']);

    return {
      title,
      key: key as keyof typeof ColumnChannel,
      ...(filterType && { filterType }),
      values,
    };
  });

  return { count, ids, items };
};

const formatNameValues: Formatter = (data) =>
  (data ?? []).map((el) => (
    <AvatarInfo
      src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(el.snippet.thumbnails.default.url)}`}
      alt={el.snippet.title}
      name={el.snippet.title}
    />
  ));

const formatHiddenSubValues: Formatter = (data) =>
  (data ?? []).map((el) =>
    el.statistics.hiddenSubscriberCount ? (
      <Icons.yesIcon width={40} height={18} />
    ) : (
      <Icons.noIcon width={36} height={19} />
    )
  );

const formatNumberValues = (data: Channel[] | undefined, key: string) =>
  formatStatistic(data, key as keyof Channel['statistics']);

const formatChannelValues: Record<
  string,
  {
    format: (data?: Channel[]) => (string | number | ReactNode)[];
    filterType?: 'checkbox';
  }
> = {
  name: { format: formatNameValues },
  hiddenSubscriberCount: {
    format: formatHiddenSubValues,
    filterType: 'checkbox',
  },
};
