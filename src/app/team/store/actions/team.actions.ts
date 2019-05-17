import { Params } from '@angular/router';
import { Action } from '@ngrx/store';
import { Team } from '../../models';

export enum TeamActionTypes {
  LoadTeams = '[Team] Load Teams',
  LoadTeamsSuccess = '[Team] Load Teams Success',
  LoadTeamsFailure = '[Team] Load Teams Failed',
  AddTeam = '[Team] Add Team',
  AddTeamSuccess = '[Team] Add Team Success',
  AddTeamFailure = '[Team] Add Team Failure',
  UpdateCloseAlert = '[Team] Update Close Alert',
  UpdateTeamRecord = '[Team] Update Team Record',
  UpdateTeamRecordSuccess = '[Team] Update Team Record Success',
  UpdateTeamRecordFailure = '[Team] Update Team Record Failure',
  NavigateAction = '[Team] Route to next url',
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

export class UpdateTeamRecord implements Action {
  readonly type = TeamActionTypes.UpdateTeamRecord;

  constructor(public payload: { teamId: string; delta: number; field: string }) {}
}

export class UpdateTeamRecordSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamRecordSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamRecordFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamRecordFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateCloseAlert implements Action {
  readonly type = TeamActionTypes.UpdateCloseAlert;

  constructor(public payload: { closeAlert: boolean }) {}
}

export class NavigateAction implements Action {
  readonly type = TeamActionTypes.NavigateAction;
  constructor(public payload: { url: string; pathParams?: any[]; queryParams?: Params }) {}
}

export type TeamActionsUnion =
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFailure
  | AddTeam
  | AddTeamSuccess
  | AddTeamFailure
  | UpdateCloseAlert
  | UpdateTeamRecord
  | UpdateTeamRecordSuccess
  | UpdateTeamRecordFailure
  | NavigateAction;
