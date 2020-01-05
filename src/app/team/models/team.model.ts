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
  plusMinusGoal: number;
}

export interface TeamWithPercentages extends Team {
  points: number;
  gamesPlayed: number;
  winPercentage: number;
  lossPercentage: number;
  drawPercentage: number;
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

export interface UpdateTeamValue {
  value: number;
  field: string;
}
