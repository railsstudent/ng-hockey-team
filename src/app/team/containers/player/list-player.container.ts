import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from '../../../shared/';
import { getAllPlayers, getPlayerLoading, LeagueState, PlayerActions } from '../../store';

@Component({
  selector: 'player-list',
  templateUrl: './list-player.container.html',
  styleUrls: ['./list-player.container.scss'],
})
export class ListPlayerContainer implements OnInit, OnDestroy {
  players$ = this.store.pipe(select(getAllPlayers));
  loading$ = this.store.pipe(select(getPlayerLoading));

  unsubscribe$ = new Subject();

  constructor(private store: Store<LeagueState>, private progress: ProgressService) {}

  ngOnInit() {
    this.store.dispatch(PlayerActions.LoadPlayers());

    this.loading$
      .pipe(
        tap(loading => (loading ? this.progress.show() : this.progress.hide())),
        catchError(() => {
          this.progress.hide();
          return EMPTY;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
