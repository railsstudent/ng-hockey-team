import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, delay, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { PlayerService } from '../../services';
import { PlayerActions } from '../actions';

const DELAY = 2000;

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions, private service: PlayerService) {}

  addPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.addPlayer),
      exhaustMap(({ newPlayer }) => {
        const player$ = this.service.addPlayer(newPlayer).pipe(delay(DELAY));
        return player$.pipe(
          map(player => PlayerActions.addPlayerSuccess({ player, message: 'Player is created successfully' })),
          catchError((error: string) => of(PlayerActions.addPlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.updatePlayer),
      concatMap(({ player }) => {
        const { id: playerId } = player;
        if (typeof playerId === 'undefined' || playerId === null || playerId === '') {
          return of(PlayerActions.updatePlayerFailure({ error: 'Player id does not exist' })).pipe(delay(DELAY));
        }

        const player$ = this.service.updatePlayer(player).pipe(delay(DELAY));
        return player$.pipe(
          map(updatedPlayer =>
            PlayerActions.updatePlayerSuccess({ player: updatedPlayer, message: 'Player is created successfully' }),
          ),
          catchError((error: string) => of(PlayerActions.updatePlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.deletePlayer),
      mergeMap(({ playerId }) => {
        if (typeof playerId === 'undefined' || playerId === null || playerId === '') {
          return of(PlayerActions.deletePlayerFailure({ error: 'Player id does not exist' }));
        }
        return EMPTY;
      }),
    ),
  );

  loadPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayer),
      switchMap(({ playerId }) => {
        if (!playerId) {
          return of(PlayerActions.loadPlayerFailure({ error: 'Player id does not exist' }));
        }
        return EMPTY;
      }),
    ),
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      switchMap(() => EMPTY),
    ),
  );
}
