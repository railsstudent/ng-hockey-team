import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Team, TeamWithPercentages, TeamWithPoints } from '../../models';
import { TeamActions } from '../actions';

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
        loading: true,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamSuccess: {
      const { team, message } = teamAction.payload;
      return {
        ...adapter.addOne(team, state),
        error: null,
        message,
        closeAlert: false,
        loading: false,
      };
    }

    case TeamActions.TeamActionTypes.AddTeamFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
        closeAlert: false,
        loading: false,
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
        loading: true,
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
        loading: false,
      };
    }

    case TeamActions.TeamActionTypes.UpdateTeamRecordFailure: {
      const { error } = teamAction.payload;
      return {
        ...state,
        message: null,
        error,
        closeAlert: false,
        loading: false,
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
export const getLoading = (state: State) => state.loading;

export const calculateTeamPoints = (team: Team): TeamWithPoints => {
  const { numWin = 0, numDraw = 0, numOTWin = 0, numLoss = 0 } = team || {};
  const points = numWin * WIN_POINTS + numDraw * DRAW_POINT + numOTWin * DRAW_POINT;
  const gamesPlayed = numWin + numDraw + numLoss;
  return { ...team, points, gamesPlayed };
};

const PERCENTAGE = 100;
export const calculateTeamPercentages = (team: Team): TeamWithPercentages => {
  const teamWithPoints = calculateTeamPoints(team);
  const { numWin, numDraw, numLoss, gamesPlayed } = teamWithPoints;
  const winPercentage = gamesPlayed === 0 ? 0 : (numWin * PERCENTAGE) / gamesPlayed;
  const lossPercentage = gamesPlayed === 0 ? 0 : (numLoss * PERCENTAGE) / gamesPlayed;
  const drawPercentage = gamesPlayed === 0 ? 0 : (numDraw * PERCENTAGE) / gamesPlayed;
  return { ...teamWithPoints, winPercentage, lossPercentage, drawPercentage };
};

export const sortedOffensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => second.goalsFor - first.goalsFor);

export const sortedDefensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => first.goalsAgainst - second.goalsAgainst);

export const sortTeamsByPoints = (teams: TeamWithPoints[]) =>
  [...teams].sort((first, second) => second.points - first.points);

export const divisionStanding = (teams: TeamWithPercentages[]) => {
  const sortedTeamsDesc = [...teams].sort((first, second) => second.points - first.points);
  return sortedTeamsDesc.reduce(
    (acc, t) => {
      if (!acc[t.division]) {
        acc[t.division] = [t];
      } else {
        acc[t.division] = acc[t.division].concat(t);
      }
      return acc;
    },
    {} as { [key: string]: TeamWithPercentages[] },
  );
};
