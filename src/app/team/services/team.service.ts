import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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

  addTeam(division: string, name: string): Observable<Team> {
    if (name.toLowerCase() === 'bad ass') {
      return throwError('Bad Ass is not an appropriate team name');
    }

    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];
    const isNameDuplicated = teamArray.some(t => t.name.toLowerCase() === name.toLowerCase());
    if (isNameDuplicated) {
      return throwError(`${name} is already used in the league`);
    }

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

  getTeam(id: string): Observable<Team> {
    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];

    const team = teamArray.find(t => t.id === id);
    if (team) {
      return of(team);
    }
    console.error(`team with ${id} does not exist.`);
    return throwError('Team does not exist.');
  }

  updateWin(id: string, delta: number): Observable<Team> {
    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];

    const team = teamArray.find(t => t.id === id);
    if (team) {
      if (team.numWin + delta < 0) {
        team.numWin = 0;
      } else {
        team.numWin = team.numWin + delta;
      }
      localStorage.setItem('teams', JSON.stringify(teamArray));
      return of(team);
    }
    console.error(`team with ${id} does not exist.`);
    return throwError('Team does not exist to update total number of wins.');
  }
}
