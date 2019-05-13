import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeagueState } from '../store';

@Component({
  selector: 'team-tables',
  templateUrl: './team-tables.container.html',
  styleUrls: ['./team-tables.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamTablesContainer implements OnInit {
  constructor(private store: Store<LeagueState>) {}

  ngOnInit() {}
}
