import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TeamActions, TeamActionTypes } from './team.actions';
import { Team } from './team.model';

export interface TeamState extends EntityState<Team> {
  // additional entities state properties
  error: string | null;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: TeamState = adapter.getInitialState({
  // additional entity state properties
  error: null,
});

export function teamReducer(state = initialState, action: Action): TeamState {
  const teamAction = action as TeamActions;

  switch (teamAction.type) {
    case TeamActionTypes.LoadTeamsSuccess: {
      return {
        ...adapter.addAll(teamAction.payload.teams, state),
        error: null,
      };
    }

    case TeamActionTypes.LoadTeamsFailed: {
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

// select the array of team ids
export const selectTeamIds = selectIds;

// select the dictionary of user entities
export const selectTeamEntities = selectEntities;

// select the array of teams
export const selectAllTeams = selectAll;

// select the total team count
export const selectTeamTotal = selectTotal;
