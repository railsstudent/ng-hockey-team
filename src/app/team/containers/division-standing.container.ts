import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { DIVISION_ORDER } from '../../shared';
import { getDivisionStanding, getTeamLoading, LeagueState, TeamActions } from '../store';

@Component({
  selector: 'app-division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer implements OnInit, OnDestroy {
  divisionStanding$ = this.store.pipe(select(getDivisionStanding));
  loading$ = this.store.pipe(select(getTeamLoading));
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<LeagueState>,
    @Inject(DIVISION_ORDER) public orderOfDivision: string[],
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  gotoTeam(teamId: string) {
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
