import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeam from './team.reducer';

export interface HockeyState {
  teams: fromTeam.State;
}

export const reducers: ActionReducerMap<HockeyState, Action> = {
  teams: fromTeam.reducer,
};

export const selectTeamsFeature = createFeatureSelector<HockeyState, fromTeam.State>('teams');
export const selectAllTeams = createSelector(
  selectTeamsFeature,
  fromTeam.selectAll,
);

export const selectTeamMessage = createSelector(
  selectTeamsFeature,
  hockeyState => hockeyState.teams,
  state => state.message,
);

export const selectTeamErrorMessage = createSelector(
  selectTeamsFeature,
  hockeyState => hockeyState.teams,
  state => state.error,
);

// select the array of teams
// export const selectAllTeams = createSelector(selectTeamsFeature, from);

// fromTeam.selectAll;

// select the array of team ids
// export const selectTeamIds = fromTeam.selectIds;

// select the dictionary of user entities
// export const selectTeamEntities = fromTeam.selectEntities;

// select the array of teams
// export const selectAllTeams = fromTeam.selectAll;

// select the total team count
// export const selectTeamTotal = fromTeam.selectTotal;
