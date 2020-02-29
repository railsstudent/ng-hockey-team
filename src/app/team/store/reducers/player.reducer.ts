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
  on(PlayerActions.AddPlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.AddPlayerSuccess, (state, { player, message }) => ({
    ...playerAdapter.addOne(player, state),
    message,
    loading: false,
  })),
  on(PlayerActions.AddPlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.UpdatePlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.UpdatePlayerSuccess, (state, { player, message }) => {
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
  on(PlayerActions.UpdatePlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.DeletePlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.DeletePlayerSuccess, (state, { playerId, message }) => ({
    ...playerAdapter.removeOne(playerId, state),
    message,
    loading: false,
  })),
  on(PlayerActions.DeletePlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.LoadPlayer, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.LoadPlayerSuccess, (state, { player }) => ({
    ...playerAdapter.addOne(player, state),
    loading: false,
  })),
  on(PlayerActions.LoadPlayerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlayerActions.LoadPlayers, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(PlayerActions.LoadPlayersSuccess, (state, { players }) => ({
    ...playerAdapter.addAll(players, state),
    loaded: true,
    loading: false,
  })),
  on(PlayerActions.LoadPlayersFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),
);

export function reducer(state: PlayerState | undefined, actions: Action) {
  return playerReducer(state, actions);
}

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = playerAdapter.getSelectors();

export const selectPlayerIds = selectIds;
export const selectPlayerEntities = selectEntities;
export const selectPlayers = selectAll;
export const selectPlayerTotal = selectTotal;

export const getError = (state: PlayerState) => state.error;
export const getMessage = (state: PlayerState) => state.message;
export const getLoaded = (state: PlayerState) => state.loaded;
export const getLoading = (state: PlayerState) => state.loading;
