import { ChannelStats } from 'entities/channel/model/types';

export const formatMetric = (
  data: ChannelStats[],
  field: keyof ChannelStats
): string => {
  if (!data.length) return 'No data';
  const lastMetric = data[data.length - 1];
  const metric = lastMetric[field];
  const formatMetric = Number(metric);
  if (!formatMetric) return '';
  if (formatMetric >= 1_000_000_000) {
    return (formatMetric / 1_000_000_000).toFixed(1) + 'B';
  }
  if (formatMetric >= 1_000_000) {
    return (formatMetric / 1_000_000).toFixed(1) + 'M';
  }
  if (formatMetric >= 1_000) {
    return (formatMetric / 1_000).toFixed(1) + 'K';
  }
  return formatMetric.toString();
};

export const countPercent = (
  data: ChannelStats[],
  field: keyof ChannelStats
) => {
  const empty = { value: '0', isPositive: true };
  if (data.length < 2) return empty;
  const preLastMetric = data[data.length - 2];
  if (!preLastMetric[field]) return empty;

  const lastMetric = data[data.length - 1];
  const formatLastMetric = Number(lastMetric[field]);
  const formatPreLastMetric = Number(preLastMetric[field]);
  return {
    value: (formatLastMetric / formatPreLastMetric).toFixed(0),
    isPositive: formatLastMetric > formatPreLastMetric,
  };
};
