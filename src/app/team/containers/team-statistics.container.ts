import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getOverallStanding, LeagueState, TeamActions } from '../store';

@Component({
  selector: 'team-statistics-container',
  templateUrl: './team-statistics.container.html',
  styleUrls: ['./team-statistics.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsContainer {
  overallStanding$ = this.store.pipe(select(getOverallStanding));

  constructor(private store: Store<LeagueState>) {}

  gotoTeam(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(TeamActions.NavigateAction(url, pathParams));
  }

  createTeam() {
    const url = '/team/new';
    this.store.dispatch(TeamActions.NavigateAction(url));
  }
}
