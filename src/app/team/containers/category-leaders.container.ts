import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NavigationActions } from 'src/app/store';
import {
  getTeamLoading,
  getTopDefensiveTeams,
  getTopOffensiveTeams,
  getTopThreeTeams,
  getWorstDefensiveTeams,
  getWorstOffensiveTeams,
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
    this.store.dispatch(NavigationActions.NextRoute(url, pathParams));
  }
}
