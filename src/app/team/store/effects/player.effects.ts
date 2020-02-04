import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PlayerService } from '../../services';
import { PlayerActions } from '../actions';

const DELAY = 2000;

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions, private service: PlayerService, private router: Router) {}

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
            PlayerActions.updatePlayerSuccess({ player: updatedPlayer, message: 'Player is updated successfully' }),
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
        const player$ = this.service.deletePlayer(playerId).pipe(delay(DELAY));
        return player$.pipe(
          map(player =>
            PlayerActions.deletePlayerSuccess({ playerId: player.id, message: 'Player is deleted successfully' }),
          ),
          catchError((error: string) => of(PlayerActions.deletePlayerFailure({ error })).pipe(delay(DELAY))),
        );
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
        const player$ = this.service.getPlayer(playerId).pipe(delay(DELAY));
        return player$.pipe(
          map(player => PlayerActions.loadPlayerSuccess({ player })),
          catchError((error: string) => of(PlayerActions.loadPlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      switchMap(() => {
        const player$ = this.service.getAll().pipe(delay(DELAY));
        return player$.pipe(
          map(players => PlayerActions.loadPlayersSuccess({ players })),
          catchError((error: string) => of(PlayerActions.loadPlayersFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(PlayerActions.NavigateAction.type),
    tap(({ url, queryParams, pathParams }) => this.router.navigate([url, ...(pathParams as any[])], queryParams)),
  );
}
