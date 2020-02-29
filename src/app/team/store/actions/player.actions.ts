import { createAction, props } from '@ngrx/store';
import { NewPlayer, Player } from '../../models';

export const AddPlayer = createAction('[Player] Add Player', props<{ newPlayer: NewPlayer }>());
export const AddPlayerSuccess = createAction(
  '[Player] Add Player Success',
  props<{ player: Player; message: string }>(),
);
export const AddPlayerFailure = createAction('[Player] Add Player Failure', props<{ error: string }>());

export const DeletePlayer = createAction('[Player] Delete Player', props<{ playerId: string }>());
export const DeletePlayerSuccess = createAction(
  '[Player] Delete Player Success',
  props<{ playerId: string; message: string }>(),
);
export const DeletePlayerFailure = createAction('[Player] Delete Player Failure', props<{ error: string }>());

export const UpdatePlayer = createAction('[Player] Update Player', props<{ player: Player }>());
export const UpdatePlayerSuccess = createAction(
  '[Player] Update Player Success',
  props<{ player: Player; message: string }>(),
);
export const UpdatePlayerFailure = createAction('[Player] Update Player Failure', props<{ error: string }>());

export const LoadPlayer = createAction('[Player] Load Player', props<{ playerId: string }>());
export const LoadPlayerSuccess = createAction('[Player] Load Player Success', props<{ player: Player }>());
export const LoadPlayerFailure = createAction('[Player] Load Player Failure', props<{ error: string }>());

export const LoadPlayers = createAction('[Player] Load Players');
export const LoadPlayersSuccess = createAction('[Player] Load Players Success', props<{ players: Player[] }>());
export const LoadPlayersFailure = createAction('[Player] Load Players Failure', props<{ error: string }>());
