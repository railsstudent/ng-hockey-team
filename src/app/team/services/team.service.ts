import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Team, UPDATE_STAT_TYPE } from '../models';

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
    return this.updateStat(id, delta, UPDATE_STAT_TYPE.WIN);
  }

  updateLoss(id: string, delta: number): Observable<Team> {
    return this.updateStat(id, delta, UPDATE_STAT_TYPE.LOSS);
  }

  updateDraw(id: string, delta: number): Observable<Team> {
    return this.updateStat(id, delta, UPDATE_STAT_TYPE.DRAW);
  }

  updateOvertimeWin(id: string, delta: number): Observable<Team> {
    return this.updateStat(id, delta, UPDATE_STAT_TYPE.OVERTIME_WIN);
  }

  updateOvertimeLoss(id: string, delta: number): Observable<Team> {
    return this.updateStat(id, delta, UPDATE_STAT_TYPE.OVERTIME_LOSS);
  }

  private mapStatTypeToText(statType: UPDATE_STAT_TYPE) {
    switch (statType) {
      case UPDATE_STAT_TYPE.WIN:
        return 'wins';
      case UPDATE_STAT_TYPE.LOSS:
        return 'losses';
      case UPDATE_STAT_TYPE.DRAW:
        return 'draws';
      case UPDATE_STAT_TYPE.OVERTIME_WIN:
        return 'overtime wins';
      case UPDATE_STAT_TYPE.OVERTIME_LOSS:
        return 'overtime losses';
      default:
        return 'N/A';
    }
  }

  private updateStat(id: string, delta: number, statType: UPDATE_STAT_TYPE): Observable<Team> {
    try {
      const teamStr = localStorage.getItem('teams');
      const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];
      const description = this.mapStatTypeToText(statType);

      const team = teamArray.find(t => t.id === id);
      if (team) {
        switch (statType) {
          case UPDATE_STAT_TYPE.WIN:
            if (team.numWin + delta < 0) {
              team.numWin = 0;
            } else {
              team.numWin = team.numWin + delta;
            }
            break;
          case UPDATE_STAT_TYPE.LOSS:
            if (team.numLoss + delta < 0) {
              team.numLoss = 0;
            } else {
              team.numLoss = team.numLoss + delta;
            }
            break;
          case UPDATE_STAT_TYPE.DRAW:
            if (team.numDraw + delta < 0) {
              team.numDraw = 0;
            } else if (team.numDraw + delta >= team.numOTWin + team.numOTLoss) {
              team.numDraw = team.numDraw + delta;
            } else {
              return throwError('Number of draws must exceed number of overtime wins and overtime losses.');
            }
            break;
          case UPDATE_STAT_TYPE.OVERTIME_WIN:
            if (team.numOTWin + delta < 0) {
              team.numOTWin = 0;
            } else if (team.numOTWin + delta + team.numOTLoss <= team.numDraw) {
              team.numOTWin = team.numOTWin + delta;
            } else {
              return throwError('Number of overtime wins and overtime losses cannot exceed number of draws.');
            }
            break;
          case UPDATE_STAT_TYPE.OVERTIME_LOSS:
            if (team.numOTLoss + delta < 0) {
              team.numOTLoss = 0;
            } else if (team.numOTLoss + delta + team.numOTWin <= team.numDraw) {
              team.numOTLoss = team.numOTLoss + delta;
            } else {
              return throwError('Number of overtime wins and overtime losses cannot exceed number of draws.');
            }
            break;
          default:
            break;
        }
        localStorage.setItem('teams', JSON.stringify(teamArray));
        return of(team);
      }
      console.error(`team with ${id} does not exist.`);
      return throwError(`Team does not exist to update total number of ${description}.`);
    } catch (e) {
      return throwError(e.message);
    }
  }
}
