import { Action, createReducer, on } from '@ngrx/store';
import { AlertActions } from '../actions';

export interface AlertState {
  closeAlert: boolean;
}

export const initialState: AlertState = {
  closeAlert: false,
};

const alertReducer = createReducer(
  initialState,
  on(AlertActions.openAlert, state => ({ ...state, closeAlert: false })),
  on(AlertActions.closeAlert, state => ({ ...state, closeAlert: true })),
);

export function reducer(state: AlertState | undefined, action: Action) {
  return alertReducer(state, action);
}

export const getCloseAlert = (state: AlertState) => state.closeAlert;
