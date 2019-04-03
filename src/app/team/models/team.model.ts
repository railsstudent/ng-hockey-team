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

export interface TeamWithScore extends Team {
  points: number;
  gamePlayed: number;
}
