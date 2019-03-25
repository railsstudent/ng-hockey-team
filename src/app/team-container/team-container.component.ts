import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTeams, State } from '../reducers';
import { Team } from '../team';
import * as teamActions from '../team/team.actions';

@Component({
  selector: 'app-team',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamContainerComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(private store: Store<State>) {
    this.teams$ = this.store.pipe(select(selectAllTeams));
  }

  ngOnInit() {
    this.store.dispatch(new teamActions.LoadTeams());
  }
}
