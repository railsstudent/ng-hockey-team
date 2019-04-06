import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamService } from '../services';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService, private router: Router) {}

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeams),
    mergeMap(() =>
      this.teamService.getAll().pipe(
        map(teams => new TeamActions.LoadTeamsSuccess({ teams })),
        catchError((error: string) => {
          console.log(error);
          return of(new TeamActions.LoadTeamsFailure({ error }));
        }),
      ),
    ),
  );

  @Effect()
  addTeam$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.AddTeam),
    map((action: TeamActions.AddTeam) => action.payload),
    concatMap(({ division, name }) =>
      this.teamService.addTeam(division, name).pipe(
        map(team => new TeamActions.AddTeamSuccess({ team, message: 'Team is created successfully.' })),
        catchError((error: string) => of(new TeamActions.AddTeamFailure({ error }))),
      ),
    ),
  );

  @Effect()
  loadTeamRoster$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeamRoster),
    map((action: TeamActions.LoadTeamRoster) => action.payload),
    switchMap(({ teamId }) =>
      this.teamService.getTeam(teamId).pipe(
        map(team => new TeamActions.LoadTeamsRosterSuccess({ team })),
        catchError((error: string) => of(new TeamActions.LoadTeamsRosterFailure({ error }))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loadTeamRosterSuccess$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.LoadTeamRosterSuccess),
    map((action: TeamActions.LoadTeamsRosterSuccess) => action.payload),
    tap(({ team }) => this.router.navigate(['/team/roster', team.id])),
  );

  @Effect()
  updateWin$ = this.actions$.pipe(
    ofType(TeamActions.TeamActionTypes.UpdateTeamWin),
    map((action: TeamActions.UpdateTeamWin) => action.payload),
    concatMap(({ teamId, delta }) =>
      this.teamService.updateWin(teamId, delta).pipe(
        map(team => new TeamActions.UpdateTeamWinSuccess({ team })),
        catchError((error: string) => of(new TeamActions.UpdateTeamWinFailure({ error }))),
      ),
    ),
  );
}
