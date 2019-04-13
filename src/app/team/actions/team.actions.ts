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
  UpdateTeamWin = '[Team] Update Team Win',
  UpdateTeamWinSuccess = '[Team] Update Team Win Success',
  UpdateTeamWinFailure = '[Team] Update Team Win Failure',
  UpdateTeamLoss = '[Team] Update Team Loss',
  UpdateTeamLossSuccess = '[Team] Update Team Loss Success',
  UpdateTeamLossFailure = '[Team] Update Team Loss Failure',
  UpdateTeamDraw = '[Team] Update Team Draw',
  UpdateTeamDrawSuccess = '[Team] Update Team Draw Success',
  UpdateTeamDrawFailure = '[Team] Update Team Draw Failure',
  UpdateTeamOvertimeWin = '[Team] Update Team Overtime Win',
  UpdateTeamOvertimeWinSuccess = '[Team] Update Team Overtime Win Success',
  UpdateTeamOvertimeWinFailure = '[Team] Update Team Overtime Win Failure',
  UpdateTeamOvertimeLoss = '[Team] Update Team Overtime Loss',
  UpdateTeamOvertimeLossSuccess = '[Team] Update Team Overtime Loss Success',
  UpdateTeamOvertimeLossFailure = '[Team] Update Team Overtime Loss Failure',
  UpdateCloseAlert = '[Team] Update Close Alert',
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

  constructor(public payload: { team: Team }) {}
}

export class LoadTeamsRosterFailure implements Action {
  readonly type = TeamActionTypes.LoadTeamRosterFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateTeamWin implements Action {
  readonly type = TeamActionTypes.UpdateTeamWin;

  constructor(public payload: { teamId: string; delta: number }) {}
}

export class UpdateTeamWinSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamWinSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamWinFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamWinFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateTeamLoss implements Action {
  readonly type = TeamActionTypes.UpdateTeamLoss;

  constructor(public payload: { teamId: string; delta: number }) {}
}

export class UpdateTeamLossSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamLossSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamLossFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamLossFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateTeamDraw implements Action {
  readonly type = TeamActionTypes.UpdateTeamDraw;

  constructor(public payload: { teamId: string; delta: number }) {}
}

export class UpdateTeamDrawSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamDrawSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamDrawFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamDrawFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateTeamOvertimeWin implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeWin;

  constructor(public payload: { teamId: string; delta: number }) {}
}

export class UpdateTeamOvertimeWinSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeWinSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamOvertimeWinFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeWinFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateTeamOvertimeLoss implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeLoss;

  constructor(public payload: { teamId: string; delta: number }) {}
}

export class UpdateTeamOvertimeLossSuccess implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeLossSuccess;

  constructor(public payload: { team: Team }) {}
}

export class UpdateTeamOvertimeLossFailure implements Action {
  readonly type = TeamActionTypes.UpdateTeamOvertimeLossFailure;

  constructor(public payload: { error: string }) {}
}

export class UpdateCloseAlert implements Action {
  readonly type = TeamActionTypes.UpdateCloseAlert;

  constructor(public payload: { closeAlert: boolean }) {}
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
  | LoadTeamsRosterFailure
  | UpdateTeamWin
  | UpdateTeamWinSuccess
  | UpdateTeamWinFailure
  | UpdateTeamLoss
  | UpdateTeamLossSuccess
  | UpdateTeamLossFailure
  | UpdateTeamDraw
  | UpdateTeamDrawSuccess
  | UpdateTeamDrawFailure
  | UpdateTeamOvertimeWin
  | UpdateTeamOvertimeWinSuccess
  | UpdateTeamOvertimeWinFailure
  | UpdateTeamOvertimeLoss
  | UpdateTeamOvertimeLossSuccess
  | UpdateTeamOvertimeLossFailure
  | UpdateCloseAlert;
