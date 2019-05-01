import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DIVISION_ORDER } from '../../shared';
import { TeamWithPoints } from '../models';
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
export class TeamAnalysisContainer implements OnInit {
  topThreeTeams$ = this.store.pipe(select(getTopThreeTeams));
  unorderedDivisionLeaders$ = this.store.pipe(select(getDivisionLeaders));
  topOffensiveTeams$ = this.store.pipe(select(getTopOffensiveTeams));
  worstOffensiveTeams$ = this.store.pipe(select(getWorstOffensiveTeams));
  topDefensiveTeams$ = this.store.pipe(select(getTopDefensiveTeams));
  worstDefensiveTeams$ = this.store.pipe(select(getWorstDefensiveTeams));
  divisionLeaders$: Observable<TeamWithPoints[]>;

  constructor(private store: Store<any>, @Inject(DIVISION_ORDER) private orderOfDivisions: string[]) {}

  ngOnInit() {
    this.divisionLeaders$ = this.unorderedDivisionLeaders$.pipe(
      map((teams: { [key: string]: TeamWithPoints }) => this.orderOfDivisions.map(division => teams[division])),
    );
  }

  gotoTeam($event: Event, teamId: string) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }
}
