export interface Team {
  id: string;
  division: string;
  name: string;
  numWin: number;
  numLoss: number;
  numDraw: number;
  numOTWin: number;
  numOTLoss: number;
}

export interface TeamWithPoints extends Team {
  points: number;
  gamePlayed: number;
}

export enum UPDATE_STAT_TYPE {
  WIN = 0,
  LOSS,
  DRAW,
  OVERTIME_WIN,
  OVERTIME_LOSS,
}
