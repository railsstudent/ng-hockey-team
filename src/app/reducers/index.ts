import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
