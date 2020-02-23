import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Team, TeamWithPercentages } from '../../models';
import { TeamActions } from '../actions';

export interface State extends EntityState<Team> {
  // additional entities state properties
  error: string | null;
  message: string | null;
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  error: null,
  message: null,
  loaded: false,
  loading: false,
});

const teamReducer = createReducer(
  initialState,
  on(TeamActions.LoadTeams, state => ({ ...state, loading: true })),
  on(TeamActions.LoadTeamsSuccess, (state, { teams }) => ({
    ...adapter.addAll(teams, state),
    error: null,
    message: null,
    loaded: true,
    loading: false,
  })),
  on(TeamActions.LoadTeamsFailure, (state, { error }) => ({
    ...state,
    message: null,
    error: error || null,
    loading: false,
    loaded: false,
  })),
  on(TeamActions.AddTeam, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(TeamActions.DeleteTeam, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(TeamActions.UpdateTeamRecord, state => ({
    ...state,
    message: null,
    error: null,
    loading: true,
  })),
  on(TeamActions.AddTeamSuccess, (state, { team, message }) => ({
    ...adapter.addOne(team, state),
    error: null,
    message,
    loading: false,
  })),
  on(TeamActions.AddTeamFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TeamActions.UpdateTeamRecordFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TeamActions.DeleteTeamFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TeamActions.UpdateTeamRecordSuccess, (state, { team }) => {
    const changes = {
      id: team.id,
      changes: team,
    };
    return {
      ...adapter.updateOne(changes, state),
      loading: false,
    };
  }),
  on(TeamActions.NavigateAction, state => ({
    ...state,
    message: null,
    error: null,
  })),
  on(TeamActions.DeleteTeamSuccess, (state, { teamId, message }) => ({
    ...adapter.removeOne(teamId, state),
    message,
    loading: false,
  })),
);

export function reducer(state: State | undefined, action: TeamActions.TeamActionsUnion): State {
  return teamReducer(state, action);
}

const WIN_POINTS = 3;
const DRAW_POINT = 1;

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const getMessage = (state: State) => state.message;
export const getError = (state: State) => state.error;
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
  return sortedTeamsDesc.reduce((acc, t) => {
    if (!acc[t.division]) {
      acc[t.division] = [t];
    } else {
      acc[t.division] = acc[t.division].concat(t);
    }
    return acc;
  }, {} as { [key: string]: TeamWithPercentages[] });
};
