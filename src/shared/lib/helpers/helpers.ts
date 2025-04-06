import { Channel } from 'entities/channel';
import { Video } from 'entities/video';
import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');

  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (!exp || Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    // invalid token
    localStorage.removeItem('token');
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

export const formatAxis = (value: number) => {
  if (!value) return '';
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + 'B';
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
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
