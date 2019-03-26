import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TeamActionTypes } from './team.actions';
import { TeamService } from './team.service';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(TeamActionTypes.LoadTeams),
    mergeMap(() =>
      this.teamService.getAll().pipe(
        map(teams => ({ type: TeamActionTypes.LoadTeamsSuccess, payload: { teams } })),
        catchError((err: Error) => {
          console.error(err);
          return of({
            type: TeamActionTypes.LoadTeamsFailed,
            error: err.message,
          });
        }),
      ),
    ),
  );
}
