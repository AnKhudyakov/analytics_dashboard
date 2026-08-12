import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../api/authApi';
import { sessionEstablished } from './sessionSlice';
import { type LoginFormValues } from './validation';

export const useLogin = () => {
  const dispatch = useDispatch();
  const [loginRequest, { isLoading, isError }] = useLoginMutation();

  const login = useCallback(
    async ({ username, password, remember }: LoginFormValues) => {
      try {
        const { token } = await loginRequest({ username, password }).unwrap();
        dispatch(sessionEstablished({ token, remember }));
        return true;
      } catch {
        return false;
      }
    },
    [dispatch, loginRequest]
  );

  return { login, isLoading, hasFailed: isError };
};
