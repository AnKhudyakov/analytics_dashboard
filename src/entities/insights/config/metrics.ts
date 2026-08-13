import { type ParseKeys } from 'i18next';

import { type CompareMetric } from '../model/types';

export interface CompareMetricOption {
  key: CompareMetric;
  labelKey: ParseKeys;
}

export const COMPARE_METRICS = [
  { key: 'subscriberCount', labelKey: 'metrics.subscribers' },
  { key: 'viewCount', labelKey: 'metrics.views' },
  { key: 'videoCount', labelKey: 'metrics.videos' },
  { key: 'estimatedRevenueUsd', labelKey: 'metrics.revenue' },
] as const satisfies readonly CompareMetricOption[];
