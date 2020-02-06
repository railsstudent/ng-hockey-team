import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromPlayer from './player.reducer';
import * as fromTeam from './team.reducer';

export interface LeagueState extends fromRoot.AppState {
  teams: fromTeam.State;
  players: fromPlayer.PlayerState;
}

export const reducers: ActionReducerMap<LeagueState, any> = {
  teams: fromTeam.reducer,
  router: fromRouter.routerReducer,
  players: fromPlayer.reducer,
};

export const getTeamsFeature = createFeatureSelector<LeagueState, fromTeam.State>('teams');
export const getRouterFeature = createFeatureSelector<
  LeagueState,
  fromRouter.RouterReducerState<fromRoot.RouterStateUrl>
>('router');
export const getPlayersFeature = createFeatureSelector<LeagueState, fromPlayer.PlayerState>('players');
