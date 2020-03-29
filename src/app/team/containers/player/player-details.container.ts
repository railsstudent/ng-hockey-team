import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared';
import { getPlayerLoading, getSelectedPlayer, LeagueState } from '../../store';

@Component({
  selector: 'player-details-container',
  templateUrl: './player-details.container.html',
  styleUrls: ['./player-details.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsContainer implements OnInit, OnDestroy {
  player$ = this.store.pipe(select(getSelectedPlayer));
  loading$ = this.store.pipe(select(getPlayerLoading));

  unsubscribe$ = new Subject();

  constructor(private store: Store<LeagueState>, private progress: ProgressService) {}

  ngOnInit() {
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
