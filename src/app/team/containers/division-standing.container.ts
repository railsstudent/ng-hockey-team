import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { DIVISION_ORDER } from '../../shared';
import { getDivisionStanding, LeagueState, TeamActions } from '../store';

@Component({
  selector: 'division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer implements OnDestroy {
  unsubscribe$ = new Subject();
  divisionStanding$ = this.store.pipe(
    select(getDivisionStanding),
    takeUntil(this.unsubscribe$),
    shareReplay(1),
  );
  hasTeam$ = this.divisionStanding$.pipe(
    map(divisions => Object.keys(divisions).length > 0),
    takeUntil(this.unsubscribe$),
  );

  constructor(private store: Store<LeagueState>, @Inject(DIVISION_ORDER) public orderOfDivision: string[]) {}

  gotoTeam(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(TeamActions.NavigateAction({ url, pathParams }));
  }

  createTeam(division = '') {
    const url = '/team/new';
    const queryParams = { division };
    this.store.dispatch(TeamActions.NavigateAction({ url, queryParams }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
