import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as teamActions from '../team.actions';
import { Team } from '../team.model';
import { selectAllTeams, TeamState } from '../team.reducer';

@Component({
  selector: 'team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamContainerComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(private store: Store<TeamState>) {
    this.teams$ = this.store.pipe(select(selectAllTeams));
  }

  ngOnInit() {
    this.store.dispatch(new teamActions.LoadTeams());
  }
}
