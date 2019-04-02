import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
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
}
