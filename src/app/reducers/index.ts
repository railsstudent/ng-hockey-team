import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import * as fromTeam from '../team';

export interface State {
  team: fromTeam.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  team: fromTeam.reducer,
  router: fromRouter.routerReducer,
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, storeFreeze] : [];

export const selectTeamState = createFeatureSelector<fromTeam.State>('team');
export const selectAllTeams = createSelector(
  selectTeamState,
  fromTeam.selectAllTeams,
);
