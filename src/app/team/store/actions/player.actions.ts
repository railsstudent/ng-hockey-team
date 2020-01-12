import { createAction, props } from '@ngrx/store';

export const createPlayer = createAction('[Player] Load Players');

export const loadPlayers = createAction('[Player] Load Players');

export const loadPlayersSuccess = createAction('[Player] Load Players Success', props<{ data: any }>());

export const loadPlayersFailure = createAction('[Player] Load Players Failure', props<{ error: any }>());
