import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { getTeamsLoaded, LeagueState, TeamActions } from '../store';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded = false;

  constructor(private store: Store<LeagueState>) {
    this.store.pipe(select(getTeamsLoaded), first()).subscribe(v => (this.loaded = v));
  }

  // tslint:disable-next-line:variable-name
  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const path = next.url.map(u => u.path).join('/');
    if (next.url && next.url.length && ['roster', 'statistcs', 'players/new'].some(prefix => path.startsWith(prefix))) {
      if (!this.loaded) {
        this.store.dispatch(TeamActions.LoadTeams());
      }
    }
    return true;
  }
}
