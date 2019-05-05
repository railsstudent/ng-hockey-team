import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  getDivisionLeaders,
  getTopDefensiveTeams,
  getTopOffensiveTeams,
  getTopThreeTeams,
  getWorstDefensiveTeams,
  getWorstOffensiveTeams,
  TeamActions,
} from '../store';

@Component({
  selector: 'team-analysis',
  templateUrl: './team-analysis.container.html',
  styleUrls: ['./team-analysis.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamAnalysisContainer {
  topThreeTeams$ = this.store.pipe(select(getTopThreeTeams));
  divisionLeaders$ = this.store.pipe(select(getDivisionLeaders));
  topOffensiveTeams$ = this.store.pipe(select(getTopOffensiveTeams));
  worstOffensiveTeams$ = this.store.pipe(select(getWorstOffensiveTeams));
  topDefensiveTeams$ = this.store.pipe(select(getTopDefensiveTeams));
  worstDefensiveTeams$ = this.store.pipe(select(getWorstDefensiveTeams));

  constructor(private store: Store<any>) {}

  gotoTeam(teamId: string) {
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }
}
