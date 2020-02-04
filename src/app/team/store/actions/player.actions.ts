import { Params } from '@angular/router';
import { createAction, props, union } from '@ngrx/store';
import { NewPlayer, Player } from '../../models';

export const addPlayer = createAction('[Player] Add Player', props<{ newPlayer: NewPlayer }>());
export const addPlayerSuccess = createAction(
  '[Player] Add Player Success',
  props<{ player: Player; message: string }>(),
);
export const addPlayerFailure = createAction('[Player] Add Player Failure', props<{ error: string }>());

export const deletePlayer = createAction('[Player] Delete Player', props<{ playerId: string }>());
export const deletePlayerSuccess = createAction(
  '[Player] Delete Player Success',
  props<{ playerId: string; message: string }>(),
);
export const deletePlayerFailure = createAction('[Player] Delete Player Failure', props<{ error: string }>());

export const updatePlayer = createAction('[Player] Update Player', props<{ player: Player }>());
export const updatePlayerSuccess = createAction(
  '[Player] Update Player Success',
  props<{ player: Player; message: string }>(),
);
export const updatePlayerFailure = createAction('[Player] Update Player Failure', props<{ error: string }>());

export const loadPlayer = createAction('[Player] Load Player', props<{ playerId: string }>());
export const loadPlayerSuccess = createAction('[Player] Load Player Success', props<{ player: Player }>());
export const loadPlayerFailure = createAction('[Player] Load Player Failure', props<{ error: string }>());

export const loadPlayers = createAction('[Player] Load Players');
export const loadPlayersSuccess = createAction('[Player] Load Players Success', props<{ players: Player[] }>());
export const loadPlayersFailure = createAction('[Player] Load Players Failure', props<{ error: string }>());
export const NavigateAction = createAction(
  '[Player] Navigate to next url',
  (url: string, pathParams: any[] = [], queryParams: Params = {}) => ({ url, pathParams, queryParams }),
);
