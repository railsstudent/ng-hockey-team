import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as teamActions from './team.actions';
import { TeamService } from './team.service';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(teamActions.TeamActionTypes.LoadTeams),
    tap(() => console.log('loadTeams effect triggered')),
    mergeMap(() =>
      this.teamService.getAll().pipe(
        tap(teams => console.log('teams', teams)),
        map(teams => ({ type: teamActions.TeamActionTypes.LoadTeamsSuccess, payload: teams })),
        catchError((err: Error) => {
          console.error(err);
          return of({
            type: teamActions.TeamActionTypes.LoadTeamsFailed,
            error: err.message,
          });
        }),
      ),
    ),
  );
}
