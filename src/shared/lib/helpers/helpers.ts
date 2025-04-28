import { Channel } from 'entities/channel';
import { Video } from 'entities/video';
import { jwtDecode } from 'jwt-decode';
import { Filters } from 'shared/api/types';
import { ListItem } from 'shared/ui/components/List/ListItem/ListItem.def';

export const getToken = () =>
  sessionStorage.getItem('token') || localStorage.getItem('token');
export const removeToken = () => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (!exp || Date.now() >= exp * 1000) {
      removeToken();
      return false;
    }
    return true;
  } catch (error) {
    // invalid token
    removeToken();
    return false;
  }
};

export const formatStatistic = (
  data: Video[] | Channel[] | undefined,
  key: keyof Video['statistics'] | keyof Channel['statistics']
) => {
  if (!data) return [];
  return data.map((el) => {
    const stats = el.statistics as Video['statistics'] & Channel['statistics'];
    return stats[key] === undefined ? 'No data' : Number(stats[key]);
  });
};

export const formatDate = (date: string) => {
  return { second: date.slice(5), first: date.slice(0, 4) };
};

export const convertBigNumbers = (value: number) => {
  if (!value) return '';
  if (value >= 1_000_000_000) {
    return parseFloat((value / 1_000_000_000).toFixed(1)) + 'B';
  }
  if (value >= 1_000_000) {
    return parseFloat((value / 1_000_000).toFixed(1)) + 'M';
  }
  if (value >= 1_000) {
    return parseFloat((value / 1_000).toFixed(1)) + 'K';
  }
  return value.toString();
};

export const transformField = (
  arr: { field: string }[]
): Record<string, number> => {
  return arr.reduce(
    (acc, item) => {
      acc[item.field] = 1;
      return acc;
    },
    {} as Record<string, number>
  );
};

export const createFilters = (data: ListItem[]) =>
  data.reduce(
    (acc, obj) => {
      const key = obj.key;
      acc[key] = false;
      return acc;
    },
    {} as { [key: string]: boolean }
  );

export const encodeFilters = (filters: Filters) => {
  const json = JSON.stringify(filters);
  return btoa(json); // to base64
};

export const formatMetric = <T, K extends keyof T>(
  data: T[],
  field: K
): string => {
  if (!data.length) return 'No data';
  const lastMetric = data[data.length - 1];
  const metric = lastMetric[field];
  const formatMetric = Number(metric);
  return convertBigNumbers(formatMetric);
};

export const countPercent = <T, K extends keyof T>(data: T[], field: K) => {
  const empty = { value: '0', isPositive: true };
  if (data.length < 2) return empty;
  const preLastMetric = data[data.length - 2];
  if (!preLastMetric[field]) return empty;

  const lastMetric = data[data.length - 1];
  const formatLastMetric = Number(lastMetric[field]);
  const formatPreLastMetric = Number(preLastMetric[field]);

  const value = parseFloat(
    Math.abs(
      ((formatLastMetric - formatPreLastMetric) / formatPreLastMetric) * 100
    ).toFixed(1)
  ).toString();

  return {
    value,
    isPositive:
      formatPreLastMetric - formatLastMetric < 0 ||
      formatPreLastMetric === formatLastMetric,
  };
};

export const formatTags = (tags: string[]) =>
  tags.map((tag) => ({
    value: tag,
    count: Math.floor(Math.random() * 20) + 10,
  }));
