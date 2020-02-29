import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { NavigationActions } from 'src/app/store';
import { DIVISION_ORDER } from '../../shared';
import { getDivisionStanding, getTeamLoading, LeagueState } from '../store';

@Component({
  selector: 'division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer implements OnDestroy {
  unsubscribe$ = new Subject();
  divisionStanding$ = this.store.pipe(select(getDivisionStanding), takeUntil(this.unsubscribe$), shareReplay(1));
  hasTeam$ = this.divisionStanding$.pipe(
    map(divisions => Object.keys(divisions).length > 0),
    takeUntil(this.unsubscribe$),
  );
  loading$ = this.store.pipe(select(getTeamLoading));

  constructor(private store: Store<LeagueState>, @Inject(DIVISION_ORDER) public orderOfDivision: string[]) {}

  gotoTeam(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(NavigationActions.NextRoute(url, pathParams));
  }

  createTeam(division = '') {
    const url = '/team/new';
    const queryParams = { queryParams: { division } };
    this.store.dispatch(NavigationActions.NextRoute(url, [], queryParams));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
