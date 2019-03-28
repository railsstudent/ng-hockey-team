import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Team } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  getAll(): Observable<Team[]> {
    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];
    return of(teamArray);
  }

  addTeam(name: string, division: string) {
    if (name.toLowerCase() === 'bad ass') {
      throw new Error('Bad Ass is not an appropriate team name');
    }

    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];
    const id = uuid();

    const newTeam: Team = {
      id,
      name,
      division,
      numWin: 0,
      numDraw: 0,
      numLoss: 0,
      numOTWin: 0,
      numOTLoss: 0,
    };

    const newTeamArray = [...teamArray, newTeam];
    localStorage.setItem('teams', JSON.stringify(newTeamArray));
    return of(newTeam);
  }
}
