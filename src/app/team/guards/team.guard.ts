import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  getNationalityLoaded,
  getPlayersLoaded,
  getTeamsLoaded,
  LeagueState,
  PlayerActions,
  TeamActions,
} from '../store';

@Injectable()
export class TeamGuard implements CanActivate {
  loaded = false;
  playersLoaded = false;
  nationalityLoaded = false;

  constructor(private store: Store<LeagueState>) {
    combineLatest([
      this.store.pipe(select(getTeamsLoaded)),
      this.store.pipe(select(getPlayersLoaded)),
      this.store.pipe(select(getNationalityLoaded)),
    ])
      .pipe(first())
      .subscribe(([loaded, playersLoaded, nationalityLoaded]) => {
        this.loaded = loaded;
        this.playersLoaded = playersLoaded;
        this.nationalityLoaded = nationalityLoaded;
      });
  }

  // tslint:disable-next-line:variable-name
  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const path = next.url.map(u => u.path).join('/');
    if (
      next.url &&
      next.url.length &&
      ['roster', 'statistcs', 'players/new', 'players/details'].some(prefix => path.startsWith(prefix))
    ) {
      if (!this.loaded) {
        this.store.dispatch(TeamActions.LoadTeams());
      }
    }

    if (next.url && next.url.length && ['players/new', 'players/details'].some(prefix => path.startsWith(prefix))) {
      if (!this.nationalityLoaded) {
        this.store.dispatch(PlayerActions.LoadNationalities());
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
