import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HockeyState } from '../reducers';

@Component({
  templateUrl: './team-roster.container.html',
  styleUrls: ['./team-roster.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRosterContainer implements OnInit {
  teamId: string;

  constructor(private store: Store<HockeyState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId') || '';
  }
}
