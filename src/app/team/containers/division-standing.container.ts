import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getDivisionStanding, LeagueState } from '../store';

@Component({
  selector: 'app-division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer implements OnInit {
  divisionStanding$ = this.store.pipe(select(getDivisionStanding));
  constructor(private store: Store<LeagueState>) {}

  ngOnInit() {
    this.divisionStanding$.subscribe(v => console.log(v));
  }
}
