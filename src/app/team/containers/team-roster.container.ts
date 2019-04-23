import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { merge, Subject } from 'rxjs';
import { filter, map, share, takeUntil, tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { UpdateTeamDelta } from '../models';
import { LeagueState } from '../reducers';
import { getCloseAlert, getSelectedTeam, getTeamErrorMessage } from '../selectors';

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
  teamShare$ = this.team$.pipe(share());
  error$ = this.store.pipe(select(getTeamErrorMessage));
  hideError$ = this.store.pipe(select(getCloseAlert));

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
