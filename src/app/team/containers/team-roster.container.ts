import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import { map, share, takeUntil, tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamWithPoints, UpdateTeamDelta } from '../models';
import {
  HockeyState,
  selectCloseAlert,
  selectDivisionLeaders,
  selectOneTeam,
  selectTeamErrorMessage,
  selectTopThreeTeams,
} from '../reducers';

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
  topThreeTeams$: Observable<TeamWithPoints[] | undefined>;
  divisionLeaders$: Observable<TeamWithPoints[] | undefined>;

  unsubscribe$ = new Subject();

  isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 767px)']).pipe(map(x => x.matches));

  updateWin$ = new Subject<UpdateTeamDelta>();
  updateLoss$ = new Subject<UpdateTeamDelta>();
  updateDraw$ = new Subject<UpdateTeamDelta>();
  updateOvertimeWin$ = new Subject<UpdateTeamDelta>();
  updateOvertimeLoss$ = new Subject<UpdateTeamDelta>();
  updateGoalsFor$ = new Subject<UpdateTeamDelta>();
  updateGoalsAgainst$ = new Subject<UpdateTeamDelta>();

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
    this.topThreeTeams$ = this.store.pipe(select(selectTopThreeTeams));
    this.divisionLeaders$ = this.store.pipe(select(selectDivisionLeaders));

    this.teamShare$
      .pipe(
        tap(team => {
          if (!team) {
            const actions = [new TeamActions.LoadTeams(), new TeamActions.LoadTeamRoster({ teamId })];
            return actions.map(action => this.store.dispatch(action));
          }
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

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
        tap(({ delta, field }) => this.store.dispatch(new TeamActions.UpdateTeamRecord({ teamId, delta, field }))),
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
