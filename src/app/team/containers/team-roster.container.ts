import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, share, takeUntil, tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamWithPoints } from '../models';
import { HockeyState, selectCloseAlert, selectOneTeam, selectTeamErrorMessage } from '../reducers';

@Component({
  templateUrl: './team-roster.container.html',
  styleUrls: ['./team-roster.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRosterContainer implements OnInit, OnDestroy {
  team$: Observable<TeamWithPoints | undefined>;
  teamShare$: Observable<TeamWithPoints | undefined>;
  error$: Observable<string | null>;
  hideError$: Observable<boolean>;

  unsubscribe$ = new Subject();

  isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 767px)']).pipe(map(x => x.matches));

  updateWin$ = new Subject<number>();
  updateLoss$ = new Subject<number>();
  updateDraw$ = new Subject<number>();
  updateOvertimeWin$ = new Subject<number>();
  updateOvertimeLoss$ = new Subject<number>();

  constructor(
    private store: Store<HockeyState>,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    const teamId = this.route.snapshot.params.teamId;
    this.team$ = this.store.pipe(select(selectOneTeam));
    this.teamShare$ = this.team$.pipe(share());
    this.error$ = this.store.pipe(select(selectTeamErrorMessage));
    this.hideError$ = this.store.pipe(select(selectCloseAlert));

    this.teamShare$
      .pipe(
        map(team => {
          if (!team) {
            return this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
          }
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateWin$
      .pipe(
        tap(delta => this.store.dispatch(new TeamActions.UpdateTeamWin({ teamId, delta }))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateLoss$
      .pipe(
        tap(delta => this.store.dispatch(new TeamActions.UpdateTeamLoss({ teamId, delta }))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateDraw$
      .pipe(
        tap(delta => this.store.dispatch(new TeamActions.UpdateTeamDraw({ teamId, delta }))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateOvertimeWin$
      .pipe(
        tap(delta => this.store.dispatch(new TeamActions.UpdateTeamOvertimeWin({ teamId, delta }))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateOvertimeLoss$
      .pipe(
        tap(delta => this.store.dispatch(new TeamActions.UpdateTeamOvertimeLoss({ teamId, delta }))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }

  closeAlert() {
    this.store.dispatch(new TeamActions.UpdateCloseAlert({ closeAlert: true }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
