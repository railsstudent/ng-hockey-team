import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  getAll() {
    const teamStr = localStorage.getItem('teams');
    return teamStr ? of(JSON.parse(teamStr)) : of({ teams: [] });
  }
}
