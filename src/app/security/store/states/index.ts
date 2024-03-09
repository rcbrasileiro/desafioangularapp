import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth.state';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
