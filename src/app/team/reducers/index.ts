import * as fromRouter from '@ngrx/router-store';
import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromTeam from './team.reducer';

export interface LeagueState extends fromRoot.AppState {
  teams: fromTeam.State;
}

export const reducers: ActionReducerMap<LeagueState, Action> = {
  teams: fromTeam.reducer,
  router: fromRouter.routerReducer,
};

export const getTeamsFeature = createFeatureSelector<LeagueState, fromTeam.State>('teams');
export const getRouterFeature = createFeatureSelector<
  LeagueState,
  fromRouter.RouterReducerState<fromRoot.RouterStateUrl>
>('router');
