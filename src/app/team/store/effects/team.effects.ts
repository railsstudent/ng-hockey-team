import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { TeamService } from '../../services';
import { TeamActions } from '../actions';

const DELAY = 2000;

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService, private router: Router) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(TeamActions.LoadTeams.type),
    switchMap(() => {
      const team$ = this.teamService.getAll().pipe(delay(DELAY));
      return team$.pipe(
        map(teams => TeamActions.LoadTeamsSuccess({ teams })),
        catchError((error: string) => of(TeamActions.LoadTeamsFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect()
  addTeam$ = this.actions$.pipe(
    ofType(TeamActions.AddTeam.type),
    exhaustMap(({ division, name }) => {
      const team$ = this.teamService.addTeam(division, name).pipe(delay(DELAY));
      return team$.pipe(
        map(team => TeamActions.AddTeamSuccess({ team, message: 'Team is created successfully.' })),
        catchError((error: string) => of(TeamActions.AddTeamFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect()
  updateTeamRecord$ = this.actions$.pipe(
    ofType(TeamActions.UpdateTeamRecord.type),
    concatMap(({ teamId, delta, field }) => {
      const team$ = this.teamService.updateTeamRecord(teamId, delta, field).pipe(delay(DELAY));
      return team$.pipe(
        map(team => TeamActions.UpdateTeamRecordSuccess({ team })),
        catchError((error: string) => of(TeamActions.UpdateTeamRecordFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(TeamActions.NavigateAction.type),
    tap(({ url, queryParams, pathParams }) => {
      const queryParamsArg = queryParams ? { queryParams } : {};
      const pathParamsArg = pathParams ? pathParams : ([] as any[]);
      return this.router.navigate([url, ...pathParamsArg], queryParamsArg);
    }),
  );
}
