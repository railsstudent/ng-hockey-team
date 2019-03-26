import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  getAll(): Observable<Team[]> {
    const teamStr = localStorage.getItem('teams');
    const teamArray = teamStr ? (JSON.parse(teamStr) as Team[]) : [];
    return of(teamArray);
  }
}
