import { createAction } from '@reduxjs/toolkit';

export const sessionRefreshed = createAction<string>('api/sessionRefreshed');
