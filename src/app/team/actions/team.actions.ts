import { Action } from '@ngrx/store';
import { Team } from '../models/team.model';

export enum TeamActionTypes {
  LoadTeams = '[Team] Load Teams',
  LoadTeamsSuccess = '[Team] Load Teams Success',
  LoadTeamsFailed = '[Team] Load Teams Failed',
  // AddTeam = '[Team] Add Team',
  // UpsertTeam = '[Team] Upsert Team',
  // AddTeams = '[Team] Add Teams',
  // UpsertTeams = '[Team] Upsert Teams',
  // UpdateTeam = '[Team] Update Team',
  // UpdateTeams = '[Team] Update Teams',
  // DeleteTeam = '[Team] Delete Team',
  // DeleteTeams = '[Team] Delete Teams',
  // ClearTeams = '[Team] Clear Teams',
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamActionTypes.LoadTeamsSuccess;

  constructor(public payload: { teams: Team[] }) {}
}

export class LoadTeamsFailed implements Action {
  readonly type = TeamActionTypes.LoadTeamsFailed;

  constructor(public payload: { error: string }) {}
}

// export class AddTeam implements Action {
//   readonly type = TeamActionTypes.AddTeam;

//   constructor(public payload: { team: Team }) {}
// }

// export class UpsertTeam implements Action {
//   readonly type = TeamActionTypes.UpsertTeam;

//   constructor(public payload: { team: Team }) {}
// }

// export class AddTeams implements Action {
//   readonly type = TeamActionTypes.AddTeams;

//   constructor(public payload: { teams: Team[] }) {}
// }

// export class UpsertTeams implements Action {
//   readonly type = TeamActionTypes.UpsertTeams;

//   constructor(public payload: { teams: Team[] }) {}
// }

// export class UpdateTeam implements Action {
//   readonly type = TeamActionTypes.UpdateTeam;

//   constructor(public payload: { team: Update<Team> }) {}
// }

// export class UpdateTeams implements Action {
//   readonly type = TeamActionTypes.UpdateTeams;

//   constructor(public payload: { teams: Update<Team>[] }) {}
// }

// export class DeleteTeam implements Action {
//   readonly type = TeamActionTypes.DeleteTeam;

//   constructor(public payload: { id: string }) {}
// }

// export class DeleteTeams implements Action {
//   readonly type = TeamActionTypes.DeleteTeams;

//   constructor(public payload: { ids: string[] }) {}
// }

// export class ClearTeams implements Action {
//   readonly type = TeamActionTypes.ClearTeams;
// }

export type TeamActionsUnion = LoadTeams | LoadTeamsSuccess | LoadTeamsFailed;
// | AddTeam
// | UpsertTeam
// | AddTeams
// | UpsertTeams
// | UpdateTeam
// | UpdateTeams
// | DeleteTeam
// | DeleteTeams
// | ClearTeams;
