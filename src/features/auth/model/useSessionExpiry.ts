import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRefreshMutation } from '../api/authApi';
import { selectExpiresAt } from './sessionSlice';

const REFRESH_MARGIN = 60_000;

export const useSessionExpiry = () => {
  const expiresAt = useSelector(selectExpiresAt);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (expiresAt === null) return;

    const delay = Math.max(expiresAt - Date.now() - REFRESH_MARGIN, 0);
    const timer = setTimeout(() => void refresh(), delay);

    return () => clearTimeout(timer);
  }, [expiresAt, refresh]);
};
