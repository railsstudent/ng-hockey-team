import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  getTeamLoading,
  getTopDefensiveTeams,
  getTopOffensiveTeams,
  getTopThreeTeams,
  getWorstDefensiveTeams,
  getWorstOffensiveTeams,
  TeamActions,
} from '../store';

@Component({
  selector: 'team-category-leaders',
  templateUrl: './category-leaders.container.html',
  styleUrls: ['./category-leaders.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamAnalysisContainer {
  topThreeTeams$ = this.store.pipe(select(getTopThreeTeams));
  topOffensiveTeams$ = this.store.pipe(select(getTopOffensiveTeams));
  worstOffensiveTeams$ = this.store.pipe(select(getWorstOffensiveTeams));
  topDefensiveTeams$ = this.store.pipe(select(getTopDefensiveTeams));
  worstDefensiveTeams$ = this.store.pipe(select(getWorstDefensiveTeams));
  loading$ = this.store.pipe(select(getTeamLoading));

  constructor(private store: Store<any>) {}

  gotoTeam(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(TeamActions.NavigateAction(url, pathParams));
  }
}
