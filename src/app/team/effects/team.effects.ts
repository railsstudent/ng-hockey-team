import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamService } from '../services';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeams),
    mergeMap(() =>
      this.teamService.getAll().pipe(
        map(teams => new TeamActions.LoadTeamsSuccess({ teams })),
        catchError((err: Error) => {
          console.error(err);
          return of({
            type: TeamActions.TeamActionTypes.LoadTeamsFailed,
            error: err.message,
          });
        }),
      ),
    ),
  );
}
