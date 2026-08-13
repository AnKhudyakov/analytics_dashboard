import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { baseApi } from 'shared/api';
import { routerPaths } from 'shared/constants';

import { useLogoutMutation } from '../api/authApi';
import { sessionCleared } from './sessionSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [revokeSession] = useLogoutMutation();

  return useCallback(() => {
    void revokeSession();
    dispatch(sessionCleared());
    dispatch(baseApi.util.resetApiState());
    void navigate(routerPaths.LOGIN, { replace: true });
  }, [dispatch, navigate, revokeSession]);
};
