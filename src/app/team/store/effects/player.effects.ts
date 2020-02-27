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
      ofType(PlayerActions.AddPlayer),
      exhaustMap(({ newPlayer }) => {
        const player$ = this.service.addPlayer(newPlayer).pipe(delay(DELAY));
        return player$.pipe(
          map(player => PlayerActions.AddPlayerSuccess({ player, message: 'Player is created successfully' })),
          catchError((error: string) => of(PlayerActions.AddPlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.UpdatePlayer),
      concatMap(({ player }) => {
        const { id: playerId } = player;
        if (typeof playerId === 'undefined' || playerId === null || playerId === '') {
          return of(PlayerActions.UpdatePlayerFailure({ error: 'Player id does not exist' })).pipe(delay(DELAY));
        }

        const player$ = this.service.updatePlayer(player).pipe(delay(DELAY));
        return player$.pipe(
          map(updatedPlayer =>
            PlayerActions.UpdatePlayerSuccess({ player: updatedPlayer, message: 'Player is updated successfully' }),
          ),
          catchError((error: string) => of(PlayerActions.UpdatePlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.DeletePlayer),
      mergeMap(({ playerId }) => {
        if (typeof playerId === 'undefined' || playerId === null || playerId === '') {
          return of(PlayerActions.DeletePlayerFailure({ error: 'Player id does not exist' }));
        }
        const player$ = this.service.deletePlayer(playerId).pipe(delay(DELAY));
        return player$.pipe(
          map(player =>
            PlayerActions.DeletePlayerSuccess({ playerId: player.id, message: 'Player is deleted successfully' }),
          ),
          catchError((error: string) => of(PlayerActions.DeletePlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  loadPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.LoadPlayer),
      switchMap(({ playerId }) => {
        if (!playerId) {
          return of(PlayerActions.LoadPlayerFailure({ error: 'Player id does not exist' }));
        }
        const player$ = this.service.getPlayer(playerId).pipe(delay(DELAY));
        return player$.pipe(
          map(player => PlayerActions.LoadPlayerSuccess({ player })),
          catchError((error: string) => of(PlayerActions.LoadPlayerFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.LoadPlayers),
      switchMap(() => {
        const player$ = this.service.getAll().pipe(delay(DELAY));
        return player$.pipe(
          map(players => PlayerActions.LoadPlayersSuccess({ players })),
          catchError((error: string) => of(PlayerActions.LoadPlayersFailure({ error })).pipe(delay(DELAY))),
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
