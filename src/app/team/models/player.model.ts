export enum PLAYER_POSITION {
  GOALIE = 'Goalie',
  DEFENSEMAN = 'Defenseman',
  CENTER = 'Center',
  WINGER = 'Winger',
}

export enum SHOOTING_HAND {
  LEFT = 'Left',
  RIGHT = 'Right',
}

export interface NewPlayer {
  name: string;
  dob: string;
  nationality: string;
  position: PLAYER_POSITION;
  shootingHand?: SHOOTING_HAND;
  team?: string;
  isCaptain: string;
  isAssistantCaptain: string;
  yearOfExperience: number;
  uniformNo?: string;
}

export interface Player extends NewPlayer {
  id: string;
  age: number;
}
