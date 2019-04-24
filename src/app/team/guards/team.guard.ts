import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TeamActions } from '../actions';
import { LeagueState } from '../reducers';
import { getTeamsLoaded } from '../selectors';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded: boolean;

  constructor(private store: Store<LeagueState>) {
    this.store.pipe(select(getTeamsLoaded)).subscribe(v => (this.loaded = v));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (next.url && next.url.length && next.url[0].path === 'roster') {
      if (!this.loaded) {
        this.store.dispatch(new TeamActions.LoadTeams());
      }
    }
    return true;
  }
}
