import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TeamActions } from '../actions';
import { Team } from '../models/team.model';

export interface State extends EntityState<Team> {
  // additional entities state properties
  selectedTeamId: number | null;
  error: string | null;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedTeamId: null,
  error: null,
});

export function reducer(state = initialState, action: Action): State {
  const teamAction = action as TeamActions.TeamActionsUnion;

  switch (teamAction.type) {
    case TeamActions.TeamActionTypes.LoadTeamsSuccess: {
      return {
        ...adapter.addAll(teamAction.payload.teams, state),
        error: null,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamsFailed: {
      const { error = null } = teamAction.payload;
      return {
        ...state,
        error,
      };
    }

    default: {
      return { ...state, error: null };
    }
  }
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
