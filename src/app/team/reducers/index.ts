import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { LeagueState } from './index';
import * as fromTeam from './team.reducer';

export interface LeagueState {
  teams: fromTeam.State;
}

export const reducers: ActionReducerMap<LeagueState, Action> = {
  teams: fromTeam.reducer,
};

export const getTeamsFeature = createFeatureSelector<LeagueState, fromTeam.State>('teams');
