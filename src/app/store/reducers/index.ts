import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */

import { environment } from '../../../environments/environment';
import * as fromAlert from './alert-reducer';
import { RouterStateUrl } from './custom-serializer';

export interface AppState {
  router: fromRouter.RouterReducerState;
  alert: fromAlert.AlertState;
}

export const rootReducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  alert: fromAlert.reducer,
};

export const getRouterFeature = createFeatureSelector<AppState, fromRouter.RouterReducerState<RouterStateUrl>>(
  'router',
);

export const selectRouterInfo = createSelector(getRouterFeature, state => state.state);

export const getAlertFeature = createFeatureSelector<AppState, fromAlert.AlertState>('alert');

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
export * from './custom-serializer';
export * from './alert-reducer';
