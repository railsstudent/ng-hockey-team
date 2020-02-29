import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { getPlayersLoaded, getTeamsLoaded, LeagueState, PlayerActions, TeamActions } from '../store';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded = false;
  playersLoaded = false;

  constructor(private store: Store<LeagueState>) {
    combineLatest([this.store.pipe(select(getTeamsLoaded)), this.store.pipe(select(getPlayersLoaded))])
      .pipe(first())
      .subscribe(([loaded, playersLoaded]) => {
        this.loaded = loaded;
        this.playersLoaded = playersLoaded;
      });
  }

  // tslint:disable-next-line:variable-name
  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const path = next.url.map(u => u.path).join('/');
    if (next.url && next.url.length && ['roster', 'statistcs', 'players/new'].some(prefix => path.startsWith(prefix))) {
      if (!this.loaded) {
        this.store.dispatch(TeamActions.LoadTeams());
      }
    }
    if (next.url && next.url.length && ['players/details'].some(prefix => path.startsWith(prefix))) {
      if (!this.playersLoaded) {
        this.store.dispatch(PlayerActions.LoadPlayers());
      }
    }
    return true;
  }
}
