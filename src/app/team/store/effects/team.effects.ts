import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TeamService } from '../../services';
import { TeamActions } from '../actions';
import { ProgressService } from './../../../shared/progress.service';

const DELAY = 5000;

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private router: Router,
    private progress: ProgressService,
  ) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeams),
    switchMap(() => {
      this.progress.show();
      const team$ = this.teamService.getAll().pipe(delay(DELAY));
      return team$.pipe(
        map(teams => new TeamActions.LoadTeamsSuccess({ teams })),
        catchError((error: string) => of(new TeamActions.LoadTeamsFailure({ error }))),
        finalize(() => this.progress.hide()),
      );
    }),
  );

  @Effect()
  addTeam$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.AddTeam),
    map((action: TeamActions.AddTeam) => action.payload),
    mergeMap(({ division, name }) => {
      this.progress.show();
      const team$ = this.teamService.addTeam(division, name).pipe(delay(DELAY));
      return team$.pipe(
        map(team => new TeamActions.AddTeamSuccess({ team, message: 'Team is created successfully.' })),
        catchError((error: string) => of(new TeamActions.AddTeamFailure({ error })).pipe(delay(DELAY))),
        finalize(() => this.progress.hide()),
      );
    }),
  );

  @Effect({ dispatch: false })
  loadTeamRoster$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeamRoster),
    map((action: TeamActions.LoadTeamRoster) => action.payload),
    tap(({ teamId }) => this.router.navigate(['/team/roster', teamId])),
  );

  @Effect()
  updateTeamRecord$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.UpdateTeamRecord),
    map((action: TeamActions.UpdateTeamRecord) => action.payload),
    concatMap(({ teamId, delta, field }) => {
      console.log('before this.progress.show()');
      this.progress.show();
      const team$ = this.teamService.updateTeamRecord(teamId, delta, field).pipe(delay(DELAY));
      return team$.pipe(
        map(team => new TeamActions.UpdateTeamRecordSuccess({ team })),
        catchError((error: string) => of(new TeamActions.UpdateTeamRecordFailure({ error })).pipe(delay(DELAY))),
        finalize(() => {
          this.progress.hide();
          console.log('after this.progress.hide()');
        }),
      );
    }),
  );
}
