import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPlayer from '../reducers/player.reducer';
import { getRouterInfo } from './router.selectors';
import { getAllTeams } from './team.selectors';

export const getPlayerMessage = createSelector(fromFeature.getPlayersFeature, fromPlayer.getMessage);
export const getPlayerErrorMessage = createSelector(fromFeature.getPlayersFeature, fromPlayer.getError);
export const getPlayerLoading = createSelector(fromFeature.getPlayersFeature, fromPlayer.getLoading);
export const getPlayersLoaded = createSelector(fromFeature.getPlayersFeature, fromPlayer.getLoaded);

export const getAllPlayers = createSelector(fromFeature.getPlayersFeature, fromPlayer.selectPlayers);

export const getPlayerEntities = createSelector(fromFeature.getPlayersFeature, fromPlayer.selectPlayerEntities);
export const getSelectedPlayer = createSelector(
  getPlayerEntities,
  getRouterInfo,
  (entities, router) => router.params && router.params.id && entities[router.params.id],
);

export const getNationalityLoaded = createSelector(fromFeature.getPlayersFeature, fromPlayer.getNationalityLoaded);
export const getNationalities = createSelector(fromFeature.getPlayersFeature, fromPlayer.getNationalities);

export const getPlayerNationality = createSelector(getNationalities, getSelectedPlayer, (nationalities, player) => {
  if (player) {
    return player.nationality ? nationalities[player.nationality] || 'N/A' : 'N/A';
  }
  return 'N/A';
});

export const getPlayerClub = createSelector(getAllTeams, getSelectedPlayer, (teams, player) => {
  if (player && player.team && teams && teams.length > 0) {
    const team = teams.find(t => t.id === player.team);
    return team ? team.name : 'N/A';
  }
  return 'Free agent';
});
