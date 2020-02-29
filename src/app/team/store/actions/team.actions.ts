import { createAction, props, union } from '@ngrx/store';
import { Team } from '../../models';

export const LoadTeams = createAction('[Team] Load Teams');
export const LoadTeamsSuccess = createAction('[Team] Load Teams Success', props<{ teams: Team[] }>());
export const LoadTeamsFailure = createAction('[Team] Load Teams Failed', props<{ error: string }>());
export const AddTeam = createAction('[Team] Add Team', props<{ division: string; name: string }>());
export const AddTeamSuccess = createAction('[Team] Add Team Success', props<{ team: Team; message: string }>());
export const AddTeamFailure = createAction('[Team] Add Team Failure', props<{ error: string }>());
export const UpdateTeamRecord = createAction(
  '[Team] Update Team Record',
  props<{ teamId: string; value: number; field: string }>(),
);
export const UpdateTeamRecordSuccess = createAction('[Team] Update Team Record Success', props<{ team: Team }>());
export const UpdateTeamRecordFailure = createAction('[Team] Update Team Record Failure', props<{ error: string }>());
export const DeleteTeam = createAction('[Team] Delete Team', props<{ teamId: string }>());
export const DeleteTeamSuccess = createAction(
  '[Team] Delete Team Success',
  props<{ teamId: string; message: string }>(),
);
export const DeleteTeamFailure = createAction('[Team] Delete Team Failed', props<{ error: string }>());

const all = union({
  LoadTeams,
  LoadTeamsSuccess,
  LoadTeamsFailure,
  AddTeam,
  AddTeamSuccess,
  AddTeamFailure,
  UpdateTeamRecord,
  UpdateTeamRecordSuccess,
  UpdateTeamRecordFailure,
  DeleteTeam,
  DeleteTeamSuccess,
  DeleteTeamFailure,
});
export type TeamActionsUnion = typeof all;
