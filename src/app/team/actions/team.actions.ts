import { Action } from '@ngrx/store';
import { Team } from '../models/team.model';

export enum TeamActionTypes {
  LoadTeams = '[Team] Load Teams',
  LoadTeamsSuccess = '[Team] Load Teams Success',
  LoadTeamsFailure = '[Team] Load Teams Failed',
  AddTeam = '[Team] Add Team',
  AddTeamSuccess = '[Team] Add Team Success',
  AddTeamFailure = '[Team] Add Team Failure',
  LoadTeamRoster = '[Team] Load Team Roster',
  LoadTeamRosterSuccess = '[Team] Load Team Roster Success',
  LoadTeamRosterFailure = '[Team] Load Team Roster Failure',
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamActionTypes.LoadTeamsSuccess;

  constructor(public payload: { teams: Team[] }) {}
}

export class LoadTeamsFailure implements Action {
  readonly type = TeamActionTypes.LoadTeamsFailure;

  constructor(public payload: { error: string }) {}
}

export class AddTeam implements Action {
  readonly type = TeamActionTypes.AddTeam;

  constructor(public payload: { division: string; name: string }) {}
}

export class AddTeamSuccess implements Action {
  readonly type = TeamActionTypes.AddTeamSuccess;

  constructor(public payload: { team: Team; message: string }) {}
}

export class AddTeamFailure implements Action {
  readonly type = TeamActionTypes.AddTeamFailure;

  constructor(public payload: { error: string }) {}
}

export class LoadTeamRoster implements Action {
  readonly type = TeamActionTypes.LoadTeamRoster;

  constructor(public payload: { teamId: string }) {}
}

export class LoadTeamsRosterSuccess implements Action {
  readonly type = TeamActionTypes.LoadTeamRosterSuccess;

  constructor(public payload: { teams: Team[] }) {}
}

export class LoadTeamsRosterFailure implements Action {
  readonly type = TeamActionTypes.LoadTeamRosterFailure;

  constructor(public payload: { error: string }) {}
}

export type TeamActionsUnion =
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFailure
  | AddTeam
  | AddTeamSuccess
  | AddTeamFailure
  | LoadTeamRoster
  | LoadTeamsRosterSuccess
  | LoadTeamsRosterFailure;
