import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getTeamsLoaded, LeagueState, TeamActions } from '../store';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded: boolean;

  constructor(private store: Store<LeagueState>) {
    this.store.pipe(select(getTeamsLoaded)).subscribe(v => (this.loaded = v));
  }

  // tslint:disable-next-line:variable-name
  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (next.url && next.url.length && ['roster', 'division'].includes(next.url[0].path)) {
      if (!this.loaded) {
        this.store.dispatch(new TeamActions.LoadTeams());
      }
    }
    return true;
  }
}
