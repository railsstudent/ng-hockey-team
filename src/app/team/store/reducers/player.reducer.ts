import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Player } from '../../models';
import { PlayerActions } from '../actions';

export interface PlayerState extends EntityState<Player> {
  error: string | null;
  message: string | null;
  loaded: boolean;
  loading: boolean;
}

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<Player>();

const initialState: PlayerState = playerAdapter.getInitialState({
  error: null,
  message: null,
  loaded: false,
  loading: false,
});

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.addPlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.addPlayerSuccess, (state, { player, message }) => ({
    ...playerAdapter.addOne(player, state),
    message,
    loading: false,
  })),
  on(PlayerActions.addPlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.updatePlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.updatePlayerSuccess, (state, { player, message }) => {
    const updatedPlayer = {
      id: player.id,
      changes: player,
    };
    return {
      ...playerAdapter.updateOne(updatedPlayer, state),
      message,
      loading: false,
    };
  }),
  on(PlayerActions.updatePlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.deletePlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.deletePlayerSuccess, (state, { playerId, message }) => ({
    ...playerAdapter.removeOne(playerId, state),
    message,
    loading: false,
  })),
  on(PlayerActions.deletePlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.loadPlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.loadPlayerSuccess, (state, { player }) => ({
    ...playerAdapter.addOne(player, state),
    loading: false,
  })),
  on(PlayerActions.loadPlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.loadPlayers, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.loadPlayersSuccess, (state, { players }) => ({
    ...playerAdapter.addAll(players, state),
    loaded: true,
    loading: false,
  })),
  on(PlayerActions.loadPlayersFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),
  on(PlayerActions.NavigateAction, state => ({
    ...state,
    message: null,
    error: null,
  })),
);

export function reducer(state: PlayerState | undefined, actions: Action) {
  return playerReducer(state, actions);
}

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = playerAdapter.getSelectors();

export const selectPlayerIds = selectIds;
export const selectPlayerEntities = selectEntities;
export const selectPlayerUsers = selectAll;
export const selectPlayerTotal = selectTotal;
