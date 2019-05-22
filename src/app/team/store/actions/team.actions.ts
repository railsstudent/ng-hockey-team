import { Params } from '@angular/router';
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
  props<{ teamId: string; delta: number; field: string }>(),
);
export const UpdateTeamRecordSuccess = createAction('[Team] Update Team Record Success', props<{ team: Team }>());
export const UpdateTeamRecordFailure = createAction('[Team] Update Team Record Failure', props<{ error: string }>());
export const UpdateCloseAlert = createAction('[Team] Update Close Alert', props<{ closeAlert: boolean }>());
export const NavigateAction = createAction(
  '[Team] Navigate to next url',
  (url: string, pathParams: any[] = [], queryParams: Params = {}) => ({ url, pathParams, queryParams }),
);

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
  UpdateCloseAlert,
  NavigateAction,
});
export type TeamActionsUnion = typeof all;
