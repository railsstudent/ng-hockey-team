import { Team } from './team.model';
export enum PLAYER_POSITION {
  GOALIE,
  DEFENSEMAN,
  CENTER,
  FORWARD,
}

export enum SHOOTING_HAND {
  LEFT,
  RIGHT,
}

export interface Player {
  name: string;
  dob: Date;
  age: number;
  nationality: string;
  position: PLAYER_POSITION;
  shootingHand?: SHOOTING_HAND;
  team?: {
    id: string;
    name: string;
  };
  isCaptain: boolean;
  isAssistantCaptain: boolean;
  yearOfExperience: number;
}
