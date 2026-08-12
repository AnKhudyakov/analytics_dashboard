import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectExpiresAt, sessionCleared } from './sessionSlice';

export const useSessionExpiry = () => {
  const dispatch = useDispatch();
  const expiresAt = useSelector(selectExpiresAt);

  useEffect(() => {
    if (expiresAt === null) return;

    const timeLeft = expiresAt - Date.now();
    if (timeLeft <= 0) {
      dispatch(sessionCleared());
      return;
    }

    const timer = setTimeout(() => dispatch(sessionCleared()), timeLeft);
    return () => clearTimeout(timer);
  }, [expiresAt, dispatch]);
};
