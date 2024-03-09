import { createAction } from '@ngrx/store';

export const setToken = createAction('[Auth] Set Token', (token: string) => ({ token }));
