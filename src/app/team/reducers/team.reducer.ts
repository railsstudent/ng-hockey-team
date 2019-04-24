import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { TeamActions } from '../actions';
import { Team, TeamWithPoints } from '../models';

export interface State extends EntityState<Team> {
  // additional entities state properties
  error: string | null;
  message: string | null;
  closeAlert: boolean;
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  error: null,
  message: null,
  closeAlert: false,
  loaded: false,
  loading: false,
});

export function reducer(state = initialState, action: Action): State {
  const teamAction = action as TeamActions.TeamActionsUnion;

  switch (teamAction.type) {
    case TeamActions.TeamActionTypes.LoadTeams: {
      return {
        ...state,
        loading: true,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamsSuccess: {
      return {
        ...adapter.addAll(teamAction.payload.teams, state),
        error: null,
        message: null,
        closeAlert: false,
        loaded: true,
        loading: false,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamsFailure: {
      const { error = null } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
        closeAlert: false,
        loading: false,
        loaded: false,
      };
    }

    case TeamActions.TeamActionTypes.AddTeam: {
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamSuccess: {
      const { team, message } = teamAction.payload;
      return {
        ...adapter.addOne(team, state),
        error: null,
        message,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.LoadTeamRoster: {
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamRecord: {
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamRecordSuccess: {
      const { team } = teamAction.payload;
      const changes = {
        id: team.id,
        changes: team,
      };
      return {
        ...adapter.updateOne(changes, state),
        message: null,
        error: null,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamRecordFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
        closeAlert: false,
      };
    }

    case TeamActions.TeamActionTypes.UpdateCloseAlert:
      const { closeAlert } = teamAction.payload;
      return {
        ...state,
        closeAlert,
      };

    default: {
      return state;
    }
  }
}

const WIN_POINTS = 3;
const DRAW_POINT = 1;

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const getMessage = (state: State) => state.message;
export const getError = (state: State) => state.error;
export const getCloseAlert = (state: State) => state.closeAlert;
export const getLoaded = (state: State) => state.loaded;

export const calculateTeamPoints = (team: Team): TeamWithPoints => {
  const points = team.numWin * WIN_POINTS + team.numDraw * DRAW_POINT + team.numOTWin * DRAW_POINT;
  const gamesPlayed = team.numWin + team.numDraw + team.numLoss;
  return { ...team, points, gamesPlayed };
};

export const sortedOffensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => second.goalsFor - first.goalsFor);

export const sortedDefensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => first.goalsAgainst - second.goalsAgainst);

export const sortTeamsByPoints = (teams: TeamWithPoints[]) =>
  [...teams].sort((first, second) => second.points - first.points);
