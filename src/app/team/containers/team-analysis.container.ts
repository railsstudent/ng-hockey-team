import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeamActions } from '../actions';
import { Team, TeamWithPoints } from '../models';
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
export class TeamAnalysisContainer implements OnInit {
  topThreeTeams$: Observable<TeamWithPoints[] | undefined>;
  divisionLeaders$: Observable<TeamWithPoints[] | undefined>;
  topOffensiveTeams$: Observable<Team[] | undefined>;
  worstOffensiveTeams$: Observable<Team[] | undefined>;
  topDefensiveTeams$: Observable<Team[] | undefined>;
  worstDefensiveTeams$: Observable<Team[] | undefined>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.topThreeTeams$ = this.store.pipe(select(getTopThreeTeams));
    this.divisionLeaders$ = this.store.pipe(select(getDivisionLeaders));
    this.topOffensiveTeams$ = this.store.pipe(select(getTopOffensiveTeams));
    this.worstOffensiveTeams$ = this.store.pipe(select(getWorstOffensiveTeams));
    this.topDefensiveTeams$ = this.store.pipe(select(getTopDefensiveTeams));
    this.worstDefensiveTeams$ = this.store.pipe(select(getWorstDefensiveTeams));
  }

  gotoTeam($event: Event, teamId: string) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }
}
