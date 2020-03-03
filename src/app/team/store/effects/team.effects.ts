import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { TeamService } from '../../services';
import { TeamActions } from '../actions';

const DELAY = 2000;

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService, private router: Router) {}

  loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.LoadTeams.type),
      switchMap(() => {
        const team$ = this.teamService.getAll().pipe(delay(DELAY));
        return team$.pipe(
          map(teams => TeamActions.LoadTeamsSuccess({ teams })),
          catchError((error: string) => of(TeamActions.LoadTeamsFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  addTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.AddTeam.type),
      exhaustMap(({ division, name }) => {
        const team$ = this.teamService.addTeam(division, name).pipe(delay(DELAY));
        return team$.pipe(
          map(team => TeamActions.AddTeamSuccess({ team, message: 'Team is created successfully.' })),
          catchError((error: string) => of(TeamActions.AddTeamFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  updateTeamRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.UpdateTeamRecord.type),
      concatMap(({ teamId, value, field }) => {
        const team$ = this.teamService.updateTeamRecord(teamId, value, field).pipe(delay(DELAY));
        return team$.pipe(
          map(team => TeamActions.UpdateTeamRecordSuccess({ team })),
          catchError((error: string) => of(TeamActions.UpdateTeamRecordFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );

  deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.DeleteTeam.type),
      mergeMap(({ teamId }) => {
        const team$ = this.teamService.deleteTeam(teamId).pipe(delay(DELAY));
        return team$.pipe(
          map(team =>
            TeamActions.DeleteTeamSuccess({ teamId: team.id, message: `${team.name} is deleted successfully` }),
          ),
          catchError((error: string) => of(TeamActions.DeleteTeamFailure({ error })).pipe(delay(DELAY))),
        );
      }),
    ),
  );
}
