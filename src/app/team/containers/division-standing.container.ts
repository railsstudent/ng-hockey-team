import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeagueState } from '../store';

@Component({
  selector: 'app-division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer implements OnInit {
  constructor(private store: Store<LeagueState>) {}

  ngOnInit() {}
}
