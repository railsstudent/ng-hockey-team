import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromTeam from '../reducers/team.reducer';

const THREE = 3;

export const getAllTeams = createSelector(fromFeature.getTeamsFeature, fromTeam.selectAll);

export const getAllTeamWithPercentages = createSelector(getAllTeams, teams =>
  teams.filter(t => !!t).map(fromTeam.calculateTeamPercentages),
);

export const getTeamMessage = createSelector(fromFeature.getTeamsFeature, fromTeam.getMessage);

export const getTeamErrorMessage = createSelector(fromFeature.getTeamsFeature, fromTeam.getError);

export const getTeamEntities = createSelector(fromFeature.getTeamsFeature, fromTeam.selectEntities);

export const getRouterInfo = createSelector(fromFeature.getRouterFeature, state => state.state);

// export const getSelectedTeamByParam = createSelector(
//   getTeamEntities,
//   getRouterInfo,
//   (entities, router) => router.params && router.params.teamId && entities[router.params.teamId],
// );

export const getSelectedTeam = createSelector(getTeamEntities, getRouterInfo, (entities, router) => {
  const team = router.params && router.params.teamId && entities[router.params.teamId];
  return team ? fromTeam.calculateTeamPercentages(team) : undefined;
});

export const getCloseAlert = createSelector(fromFeature.getTeamsFeature, fromTeam.getCloseAlert);

export const getTeamsLoaded = createSelector(fromFeature.getTeamsFeature, fromTeam.getLoaded);

export const getTeamLoading = createSelector(fromFeature.getTeamsFeature, fromTeam.getLoading);

export const getTopThreeTeams = createSelector(getAllTeamWithPercentages, teams =>
  fromTeam.sortTeamsByWinningPercentage(teams).slice(0, THREE),
);

export const getDivisionStanding = createSelector(getAllTeamWithPercentages, fromTeam.divisionStanding);

export const getCurrentDivision = createSelector(
  getDivisionStanding,
  getSelectedTeam,
  (divisions, team) => (team && divisions[team.division]) || undefined,
);

export const getOverallStanding = createSelector(getAllTeamWithPercentages, fromTeam.sortTeamsByWinningPercentage);

export const getTopOffensiveTeams = createSelector(getAllTeams, teams =>
  fromTeam.sortedOffensiveTeams(teams).slice(0, THREE),
);

export const getWorstOffensiveTeams = createSelector(getAllTeams, teams =>
  fromTeam.sortedOffensiveTeams(teams).slice(-THREE),
);

export const getTopDefensiveTeams = createSelector(getAllTeams, teams =>
  fromTeam.sortedDefensiveTeams(teams).slice(0, THREE),
);

export const getWorstDefensiveTeams = createSelector(getAllTeams, teams =>
  fromTeam.sortedDefensiveTeams(teams).slice(-THREE),
);
