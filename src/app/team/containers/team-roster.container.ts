import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { merge, Subject } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { UpdateTeamDelta } from '../models';
import {
  getCloseAlert,
  getSelectedTeam,
  getTeamErrorMessage,
  getTeamLoading,
  LeagueState,
  TeamActions,
} from '../store';

@Component({
  templateUrl: './team-roster.container.html',
  styleUrls: ['./team-roster.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRosterContainer implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  updateWin$ = new Subject<UpdateTeamDelta>();
  updateLoss$ = new Subject<UpdateTeamDelta>();
  updateDraw$ = new Subject<UpdateTeamDelta>();
  updateOvertimeWin$ = new Subject<UpdateTeamDelta>();
  updateOvertimeLoss$ = new Subject<UpdateTeamDelta>();
  updateGoalsFor$ = new Subject<UpdateTeamDelta>();
  updateGoalsAgainst$ = new Subject<UpdateTeamDelta>();

  teamId: string;
  isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 767px)']).pipe(map(x => x.matches));
  team$ = this.store.pipe(select(getSelectedTeam));
  error$ = this.store.pipe(select(getTeamErrorMessage));
  hideError$ = this.store.pipe(select(getCloseAlert));
  loading$ = this.store.pipe(select(getTeamLoading));

  constructor(
    private store: Store<LeagueState>,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.teamId = params.get('teamId') || '';
    });

    merge(
      this.updateWin$,
      this.updateLoss$,
      this.updateDraw$,
      this.updateOvertimeWin$,
      this.updateOvertimeLoss$,
      this.updateGoalsFor$,
      this.updateGoalsAgainst$,
    )
      .pipe(
        withLatestFrom(this.loading$, (teamDelta, loading) => ({ ...teamDelta, loading })),
        filter(({ loading }) => !!this.teamId && !loading),
        tap(({ delta, field }) =>
          this.store.dispatch(new TeamActions.UpdateTeamRecord({ teamId: this.teamId, delta, field })),
        ),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['/team/list']);
  }

  closeAlert() {
    this.store.dispatch(new TeamActions.UpdateCloseAlert({ closeAlert: true }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
