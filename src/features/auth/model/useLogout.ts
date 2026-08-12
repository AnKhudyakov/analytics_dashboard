import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { routerPaths } from 'shared/constants';

import { sessionCleared } from './sessionSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useCallback(() => {
    dispatch(sessionCleared());
    void navigate(routerPaths.LOGIN, { replace: true });
  }, [dispatch, navigate]);
};
