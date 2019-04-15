import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Team, TeamWithPoints } from '../models';
import { HockeyState } from './index';
import * as fromTeam from './team.reducer';

const WIN_POINTS = 3;
const DRAW_POINT = 1;

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
      const points = team.numWin * WIN_POINTS + team.numDraw * DRAW_POINT + team.numOTWin * DRAW_POINT;
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
      const points = team.numWin * WIN_POINTS + team.numDraw * DRAW_POINT + team.numOTWin * DRAW_POINT;
      const gamePlayed = team.numWin + team.numDraw + team.numLoss;
      return { ...team, points, gamePlayed } as TeamWithPoints;
    }
  },
);

export const selectCloseAlert = createSelector(
  selectTeamsFeature,
  (hockeyState: HockeyState) => hockeyState.teams,
  (state: fromTeam.State) => state.closeAlert,
);

export const selectTopThreeTeams = createSelector(
  selectAllTeamPoints,
  (teams: TeamWithPoints[]) => {
    const betterTeams = [...teams].sort((first, second) => {
      // const diffPoints = second.points - first.points;
      // if (diffPoints === 0) {
      //   return second.numWin - first.numWin;
      // }
      // return diffPoints;
      if (first.points < second.points) {
        return 1;
      } else if (first.points > second.points) {
        return -1;
      }
      return 0;
    });
    // tslint:disable-next-line:no-magic-numbers
    return betterTeams.slice(0, 3);
  },
);

export const selectDivisionLeaders = createSelector(
  selectAllTeamPoints,
  (teams: TeamWithPoints[]) => {
    const leaderMap = teams.reduce(
      (acc, t) => {
        if (!acc[t.division]) {
          acc[t.division] = t;
        } else if (acc[t.division].points < t.points) {
          acc[t.division] = t;
        }
        return acc;
      },
      {} as { [key: string]: TeamWithPoints },
    );
    return Object.keys(leaderMap)
      .map(k => leaderMap[k])
      .sort((a, b) => b.points - a.points);
  },
);

export const selectTopOffensiveTeams = createSelector(
  selectAllTeams,
  (teams: Team[]) => {
    console.log(teams);
    const offensiveTeams = [...teams].sort((first, second) => {
      if (first.goalsFor < second.goalsFor) {
        return 1;
      } else if (first.goalsFor > second.goalsFor) {
        return -1;
      }
      return 0;
    });
    console.log('offensive teams', offensiveTeams);
    // tslint:disable-next-line:no-magic-numbers
    return offensiveTeams.slice(0, 3);
  },
);

export const selectWorstOffensiveTeams = createSelector(
  selectAllTeams,
  (teams: Team[]) => {
    const offensiveTeams = [...teams].sort((first, second) => {
      if (first.goalsFor < second.goalsFor) {
        return -1;
      } else if (first.goalsFor > second.goalsFor) {
        return 1;
      }
      return 0;
    });
    // tslint:disable-next-line:no-magic-numbers
    return offensiveTeams.slice(0, 3);
  },
);

export const selectTopDefensiveTeams = createSelector(
  selectAllTeams,
  (teams: Team[]) => {
    const defensiveTeams = [...teams].sort((first, second) => second.goalsAgainst - first.goalsAgainst);
    // tslint:disable-next-line:no-magic-numbers
    return defensiveTeams.slice(0, 3);
  },
);

export const selectWorstDefensiveTeams = createSelector(
  selectAllTeams,
  (teams: Team[]) => {
    const defensiveTeams = [...teams].sort((first, second) => first.goalsAgainst - second.goalsAgainst);
    // tslint:disable-next-line:no-magic-numbers
    return defensiveTeams.slice(0, 3);
  },
);
