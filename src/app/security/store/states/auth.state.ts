import { createReducer, on } from '@ngrx/store';
import { setToken } from './auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null
};

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => ({ ...state, token }))
);
