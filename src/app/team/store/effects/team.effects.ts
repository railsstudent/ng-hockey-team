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
    ofType(TeamActions.TeamActionTypes.LoadTeams),
    switchMap(() => {
      const team$ = this.teamService.getAll().pipe(delay(DELAY));
      return team$.pipe(
        map(teams => new TeamActions.LoadTeamsSuccess({ teams })),
        catchError((error: string) => of(new TeamActions.LoadTeamsFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect()
  addTeam$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.AddTeam),
    map((action: TeamActions.AddTeam) => action.payload),
    exhaustMap(({ division, name }) => {
      const team$ = this.teamService.addTeam(division, name).pipe(delay(DELAY));
      return team$.pipe(
        map(team => new TeamActions.AddTeamSuccess({ team, message: 'Team is created successfully.' })),
        catchError((error: string) => of(new TeamActions.AddTeamFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect()
  updateTeamRecord$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.UpdateTeamRecord),
    map((action: TeamActions.UpdateTeamRecord) => action.payload),
    concatMap(({ teamId, delta, field }) => {
      const team$ = this.teamService.updateTeamRecord(teamId, delta, field).pipe(delay(DELAY));
      return team$.pipe(
        map(team => new TeamActions.UpdateTeamRecordSuccess({ team })),
        catchError((error: string) => of(new TeamActions.UpdateTeamRecordFailure({ error })).pipe(delay(DELAY))),
      );
    }),
  );

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.NavigateAction),
    map((action: TeamActions.NavigateAction) => action.payload),
    tap(({ url, queryParams = null, pathParams = null }) => {
      const queryParamsArg = queryParams ? { queryParams } : {};
      const pathParamsArg = pathParams ? pathParams : [];
      return this.router.navigate([url, ...pathParamsArg], queryParamsArg);
    }),
  );
}
