import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPlayer from '../reducers/player.reducer';
import { getRouterInfo } from './router.selectors';

export const getPlayerMessage = createSelector(fromFeature.getPlayersFeature, fromPlayer.getMessage);
export const getPlayerErrorMessage = createSelector(fromFeature.getPlayersFeature, fromPlayer.getError);
export const getLoading = createSelector(fromFeature.getPlayersFeature, fromPlayer.getLoading);
export const getLoaded = createSelector(fromFeature.getPlayersFeature, fromPlayer.getLoaded);

export const getAllPlayers = createSelector(fromFeature.getPlayersFeature, fromPlayer.selectPlayers);

export const getPlayerEntities = createSelector(fromFeature.getPlayersFeature, fromPlayer.selectPlayerEntities);
export const getSelectedPlayer = createSelector(
  getPlayerEntities,
  getRouterInfo,
  (entities, router) => router.params && router.params.id && entities[router.params.id],
);
