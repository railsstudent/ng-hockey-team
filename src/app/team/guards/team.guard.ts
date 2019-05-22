import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { getTeamsLoaded, LeagueState, TeamActions } from '../store';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded: boolean;

  constructor(private store: Store<LeagueState>) {
    this.store
      .pipe(
        select(getTeamsLoaded),
        first(),
      )
      .subscribe(v => (this.loaded = v));
  }

  // tslint:disable-next-line:variable-name
  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (next.url && next.url.length && ['roster', 'statistcs'].includes(next.url[0].path)) {
      if (!this.loaded) {
        this.store.dispatch(TeamActions.LoadTeams());
      }
    }
    return true;
  }
}
