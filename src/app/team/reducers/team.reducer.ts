import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TeamActions } from '../actions';
import { Team } from '../models/team.model';

export interface State extends EntityState<Team> {
  // additional entities state properties
  selectedTeam: Team | null;
  error: string | null;
  message: string | null;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedTeam: null,
  error: null,
  message: null,
});

export function reducer(state = initialState, action: Action): State {
  const teamAction = action as TeamActions.TeamActionsUnion;

  switch (teamAction.type) {
    case TeamActions.TeamActionTypes.LoadTeamsSuccess: {
      return adapter.addAll(teamAction.payload.teams, state);
    }

    case TeamActions.TeamActionTypes.LoadTeamsFailure: {
      const { error = null } = teamAction.payload;
      return {
        ...state,
        selectedTeam: null,
        message: null,
        error,
      };
    }

    case TeamActions.TeamActionTypes.AddTeam: {
      return {
        ...state,
        selectedTeam: null,
        message: null,
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamSuccess: {
      const { team, message } = teamAction.payload;
      return {
        ...adapter.addOne(team, state),
        selectedTeam: null,
        error: null,
        message,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        selectedTeam: null,
        message: null,
        error,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamRoster: {
      return {
        ...state,
        selectedTeam: null,
        message: null,
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamRosterSuccess: {
      const { team } = teamAction.payload;
      return {
        ...state,
        selectedTeam: team,
        message: null,
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamRosterFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        selectedTeam: null,
        message: null,
        error,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamWin:
    case TeamActions.TeamActionTypes.UpdateTeamLoss:
    case TeamActions.TeamActionTypes.UpdateTeamDraw:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeWin:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeLoss: {
      return {
        ...state,
        message: null,
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamWinSuccess:
    case TeamActions.TeamActionTypes.UpdateTeamLossSuccess:
    case TeamActions.TeamActionTypes.UpdateTeamDrawSuccess:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeWinSuccess:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeLossSuccess: {
      const { team } = teamAction.payload;
      const changes = {
        id: team.id,
        changes: team,
      };
      return {
        ...adapter.updateOne(changes, state),
        selectedTeam: team,
        message: null,
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamWinFailure:
    case TeamActions.TeamActionTypes.UpdateTeamLossFailure:
    case TeamActions.TeamActionTypes.UpdateTeamDrawFailure:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeWinFailure:
    case TeamActions.TeamActionTypes.UpdateTeamOvertimeLossFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
      };
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
