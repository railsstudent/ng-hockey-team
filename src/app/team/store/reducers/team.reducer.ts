import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Team, TeamWithPercentages } from '../../models';
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

export function reducer(state = initialState, action: TeamActions.TeamActionsUnion): State {
  switch (action.type) {
    case TeamActions.LoadTeams.type: {
      return {
        ...state,
        loading: true,
      };
    }

    case TeamActions.LoadTeamsSuccess.type: {
      return {
        ...adapter.addAll(action.teams, state),
        error: null,
        message: null,
        closeAlert: false,
        loaded: true,
        loading: false,
      };
    }

    case TeamActions.LoadTeamsFailure.type: {
      return {
        ...state,
        message: null,
        error: action.error || null,
        closeAlert: false,
        loading: false,
        loaded: false,
      };
    }

    case TeamActions.AddTeam.type:
    case TeamActions.DeleteTeam.type: {
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
        loading: true,
      };
    }

    case TeamActions.AddTeamSuccess.type: {
      return {
        ...adapter.addOne(action.team, state),
        error: null,
        message: action.message,
        closeAlert: false,
        loading: false,
      };
    }

    case TeamActions.AddTeamFailure.type:
    case TeamActions.UpdateTeamRecordFailure.type:
    case TeamActions.DeleteTeamFailure.type: {
      return {
        ...state,
        message: null,
        error: action.error,
        closeAlert: false,
        loading: false,
      };
    }

    case TeamActions.UpdateTeamRecord.type: {
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
        loading: true,
      };
    }

    case TeamActions.UpdateTeamRecordSuccess.type: {
      const { team } = action;
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

    case TeamActions.UpdateCloseAlert.type:
      return {
        ...state,
        closeAlert: action.closeAlert,
      };

    case TeamActions.NavigateAction.type:
      return {
        ...state,
        message: null,
        error: null,
        closeAlert: false,
      };

    case TeamActions.DeleteTeamSuccess.type:
      return state;

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

const PERCENTAGE = 100;
export const calculateTeamPercentages = (team: Team): TeamWithPercentages => {
  const { numWin = 0, numDraw = 0, numOTWin = 0, numLoss = 0 } = team || {};
  const points = numWin * WIN_POINTS + numDraw * DRAW_POINT + numOTWin * DRAW_POINT;
  const gamesPlayed = numWin + numDraw + numLoss;
  const winPercentage = gamesPlayed === 0 ? 0 : (numWin * PERCENTAGE) / gamesPlayed;
  const lossPercentage = gamesPlayed === 0 ? 0 : (numLoss * PERCENTAGE) / gamesPlayed;
  const drawPercentage = gamesPlayed === 0 ? 0 : (numDraw * PERCENTAGE) / gamesPlayed;
  return { ...team, points, gamesPlayed, winPercentage, lossPercentage, drawPercentage };
};

export const sortedOffensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => second.goalsFor - first.goalsFor);

export const sortedDefensiveTeams = (teams: Team[]) =>
  [...teams].sort((first, second) => first.goalsAgainst - second.goalsAgainst);

export const sortTeamsByWinningPercentage = (teams: TeamWithPercentages[]) =>
  [...teams].sort((first, second) =>
    second.points !== first.points ? second.points - first.points : second.winPercentage - first.winPercentage,
  );

export const divisionStanding = (teams: TeamWithPercentages[]) => {
  const sortedTeamsDesc = sortTeamsByWinningPercentage(teams);
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
