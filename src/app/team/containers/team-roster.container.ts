import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { empty, Observable, Subject } from 'rxjs';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamWithPoints } from '../models';
import { HockeyState, selectOneTeam } from '../reducers';

@Component({
  templateUrl: './team-roster.container.html',
  styleUrls: ['./team-roster.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRosterContainer implements OnInit, OnDestroy {
  team$: Observable<TeamWithPoints | undefined>;
  unsubscribe$ = new Subject();

  isSmallSize$ = this.breakpointObserver.observe(['(max-width: 767px)']).pipe(map(x => x.matches));

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

    this.team$
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
        exhaustMap(delta => {
          this.store.dispatch(new TeamActions.UpdateTeamWin({ teamId, delta }));
          return empty();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateLoss$
      .pipe(
        exhaustMap(delta => {
          this.store.dispatch(new TeamActions.UpdateTeamLoss({ teamId, delta }));
          return empty();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateDraw$
      .pipe(
        exhaustMap(delta => {
          this.store.dispatch(new TeamActions.UpdateTeamDraw({ teamId, delta }));
          return empty();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateOvertimeWin$
      .pipe(
        exhaustMap(delta => {
          this.store.dispatch(new TeamActions.UpdateTeamOvertimeWin({ teamId, delta }));
          return empty();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.updateOvertimeLoss$
      .pipe(
        exhaustMap(delta => {
          this.store.dispatch(new TeamActions.UpdateTeamOvertimeLoss({ teamId, delta }));
          return empty();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
