import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TeamActions } from '../actions';
import {
  getDivisionLeaders,
  getTopDefensiveTeams,
  getTopOffensiveTeams,
  getTopThreeTeams,
  getWorstDefensiveTeams,
  getWorstOffensiveTeams,
} from '../selectors';

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

  gotoTeam($event: Event, teamId: string) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }
}
