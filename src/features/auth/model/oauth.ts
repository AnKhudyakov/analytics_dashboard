import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { config } from 'shared/config';

import { sessionEstablished } from './sessionSlice';

export const OAUTH_PROVIDERS = ['google', 'linkedin', 'facebook'] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export type OAuthProviders = Record<OAuthProvider, boolean>;

export const oauthStartUrl = (provider: OAuthProvider) =>
  `${config.backendUrl}/auth/${provider}`;

export const useOAuthResult = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [hasFailed, setFailed] = useState(false);

  const token = params.get('token');
  const error = params.get('error');

  useEffect(() => {
    if (!token && !error) return;

    if (token) dispatch(sessionEstablished(token));
    setFailed(Boolean(error));

    const next = new URLSearchParams(params);
    next.delete('token');
    next.delete('error');
    setParams(next, { replace: true });
  }, [token, error, dispatch, params, setParams]);

  return { hasSession: Boolean(token), hasFailed };
};
