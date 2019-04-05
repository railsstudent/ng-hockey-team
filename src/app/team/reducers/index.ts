import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Team, TeamWithPoints } from '../models';
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

export const selectAllTeamPoints = createSelector(
  selectAllTeams,
  (teams: Team[]) =>
    teams.map(team => {
      const points = team.numWin * 3 + team.numDraw * 1 + team.numOTWin * 1;
      const gamePlayed = team.numWin + team.numDraw + team.numLoss;
      return { ...team, points, gamePlayed } as TeamWithPoints;
    }),
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

const selectOneTeamHelper = createSelector(
  selectTeamsFeature,
  hockeyState => hockeyState.teams,
  state => {
    return state.selectedTeam ? state.selectedTeam : undefined;
  },
);

export const selectOneTeam = createSelector(
  selectOneTeamHelper,
  (team: Team | undefined) => {
    if (team) {
      const points = team.numWin * 3 + team.numDraw * 1 + team.numOTWin * 1;
      const gamePlayed = team.numWin + team.numDraw + team.numLoss;
      return { ...team, points, gamePlayed } as TeamWithPoints;
    }
  },
);
