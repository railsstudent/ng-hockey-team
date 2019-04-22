import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, share, takeUntil, tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamWithPoints, UpdateTeamDelta } from '../models';
import { LeagueState } from '../reducers';
import { getCloseAlert, getSelectedTeam, getTeamErrorMessage } from '../selectors';

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
  updateWin$ = new Subject<UpdateTeamDelta>();
  updateLoss$ = new Subject<UpdateTeamDelta>();
  updateDraw$ = new Subject<UpdateTeamDelta>();
  updateOvertimeWin$ = new Subject<UpdateTeamDelta>();
  updateOvertimeLoss$ = new Subject<UpdateTeamDelta>();
  updateGoalsFor$ = new Subject<UpdateTeamDelta>();
  updateGoalsAgainst$ = new Subject<UpdateTeamDelta>();

  teamId: string;
  isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 767px)']).pipe(map(x => x.matches));

  constructor(
    private store: Store<LeagueState>,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.teamId = params.get('teamId') || '';
    });

    this.team$ = this.store.pipe(select(getSelectedTeam));
    this.teamShare$ = this.team$.pipe(share());
    this.error$ = this.store.pipe(select(getTeamErrorMessage));
    this.hideError$ = this.store.pipe(select(getCloseAlert));

    this.teamShare$
      .pipe(
        filter(() => !!this.teamId),
        tap(team => {
          if (!team) {
            const actions = [new TeamActions.LoadTeams(), new TeamActions.LoadTeamRoster({ teamId: this.teamId })];
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
        filter(() => !!this.teamId),
        tap(({ delta, field }) =>
          this.store.dispatch(new TeamActions.UpdateTeamRecord({ teamId: this.teamId, delta, field })),
        ),
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
