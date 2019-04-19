export interface Team {
  id: string;
  division: string;
  name: string;
  numWin: number;
  numLoss: number;
  numDraw: number;
  numOTWin: number;
  numOTLoss: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface TeamWithPoints extends Team {
  points: number;
  gamesPlayed: number;
}

export enum UPDATE_STAT_TYPE {
  WIN = 0,
  LOSS,
  DRAW,
  OVERTIME_WIN,
  OVERTIME_LOSS,
  GOALS_FOR,
  GOALS_AGAINST,
}

export interface UpdateTeamDelta {
  delta: number;
  field: string;
}
