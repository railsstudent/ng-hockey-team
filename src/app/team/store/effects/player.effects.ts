import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { concatMap, exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { PlayerActions } from '../actions';

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions) {}

  addPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.addPlayer),
      exhaustMap(({ player }) => {
        console.log('player', player);
        return EMPTY;
      }),
    ),
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.updatePlayer),
      concatMap(({ player }) => {
        const id = player.id;
        if (!id) {
          return of(PlayerActions.updatePlayerFailure({ error: 'Player id does not exist' }));
        }
        return EMPTY;
      }),
    ),
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.deletePlayer),
      mergeMap(({ playerId }) => {
        if (!playerId) {
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
