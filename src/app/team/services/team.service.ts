import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Team, UPDATE_STAT_TYPE } from '../models';

@Injectable()
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
      goalsFor: 0,
      goalsAgainst: 0,
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

  updateTeamRecord(id: string, delta: number, field: string): Observable<Team> {
    const typedStatType = field as keyof typeof UPDATE_STAT_TYPE;
    return this.updateStat(id, delta, UPDATE_STAT_TYPE[typedStatType]);
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
            if (team.numWin + team.numLoss + team.numDraw + delta <= 0 && team.goalsFor + team.goalsAgainst > 0) {
              return throwError('At least one game is played when either goals for or goals against is non-zero.');
            }

            if (team.numWin + delta < 0) {
              team.numWin = 0;
            } else {
              team.numWin = team.numWin + delta;
            }
            break;
          case UPDATE_STAT_TYPE.LOSS:
            if (team.numWin + team.numLoss + team.numDraw + delta <= 0 && team.goalsFor + team.goalsAgainst > 0) {
              return throwError('At least one game is played when either goals for or goals against is non-zero.');
            }

            if (team.numLoss + delta < 0) {
              team.numLoss = 0;
            } else {
              team.numLoss = team.numLoss + delta;
            }
            break;
          case UPDATE_STAT_TYPE.DRAW:
            if (team.numWin + team.numLoss + team.numDraw + delta <= 0 && team.goalsFor + team.goalsAgainst > 0) {
              return throwError('At least one game is played when either goals for or goals against is non-zero.');
            }

            if (team.numDraw + delta < 0) {
              team.numDraw = 0;
            } else if (team.numDraw + delta >= team.numOTWin + team.numOTLoss) {
              team.numDraw = team.numDraw + delta;
            } else {
              return throwError('Number of draws must not less than number of overtime wins and overtime losses.');
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
          case UPDATE_STAT_TYPE.GOALS_FOR:
            if (team.numWin + team.numLoss + team.numDraw > 0) {
              team.goalsFor = (team.goalsFor || 0) + delta;
            } else {
              return throwError('Cannot update goals for if no game is played.');
            }
            break;
          case UPDATE_STAT_TYPE.GOALS_AGAINST:
            if (team.numWin + team.numLoss + team.numDraw > 0) {
              team.goalsAgainst = (team.goalsAgainst || 0) + delta;
            } else {
              return throwError('Cannot update goals against if no game is played.');
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
