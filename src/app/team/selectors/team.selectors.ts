import { createSelector } from '@ngrx/store';
import { Team, TeamWithPoints } from '../models';
import * as fromFeature from '../reducers';
import * as fromTeam from '../reducers/team.reducer';

export const getAllTeams = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.selectAll,
);

export const getAllTeamPoints = createSelector(
  getAllTeams,
  (teams: Team[]) =>
    teams.map(team => {
      return fromTeam.calculateTeamPoints(team);
    }),
);

export const getTeamMessage = createSelector(
  fromFeature.getTeamsFeature,
  hockeyState => hockeyState.teams,
  fromTeam.getMessage,
);

export const getTeamErrorMessage = createSelector(
  fromFeature.getTeamsFeature,
  hockeyState => hockeyState.teams,
  fromTeam.getError,
);

export const getSelectedTeam = createSelector(
  fromFeature.getTeamsFeature,
  hockeyState => hockeyState.teams,
  fromTeam.getSelectedTeam,
);

export const getCloseAlert = createSelector(
  fromFeature.getTeamsFeature,
  (hockeyState: fromFeature.LeagueState) => hockeyState.teams,
  fromTeam.getCloseAlert,
);

export const getTopThreeTeams = createSelector(
  getAllTeamPoints,
  (teams: TeamWithPoints[]) =>
    // tslint:disable-next-line:no-magic-numbers
    fromTeam.sortTeamsByPoints(teams).slice(0, 3),
);

export const getDivisionLeaders = createSelector(
  getAllTeamPoints,
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

export const getTopOffensiveTeams = createSelector(
  getAllTeams,
  (teams: Team[]) =>
    // tslint:disable-next-line:no-magic-numbers
    fromTeam.sortedOffensiveTeams(teams).slice(0, 3),
);

export const getWorstOffensiveTeams = createSelector(
  getAllTeams,
  (teams: Team[]) =>
    // tslint:disable-next-line:no-magic-numbers
    fromTeam.sortedOffensiveTeams(teams).slice(-3),
);

export const getTopDefensiveTeams = createSelector(
  getAllTeams,
  (teams: Team[]) =>
    // tslint:disable-next-line:no-magic-numbers
    fromTeam.sortedDefensiveTeams(teams).slice(0, 3),
);

export const getWorstDefensiveTeams = createSelector(
  getAllTeams,
  (teams: Team[]) =>
    // tslint:disable-next-line:no-magic-numbers
    fromTeam.sortedDefensiveTeams(teams).slice(-3),
);
