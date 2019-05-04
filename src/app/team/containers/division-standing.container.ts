import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DIVISION_ORDER } from 'src/app/shared';
import { getDivisionStanding, LeagueState } from '../store';

@Component({
  selector: 'app-division-standing',
  templateUrl: './division-standing.container.html',
  styleUrls: ['./division-standing.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionStandingContainer {
  divisionStanding$ = this.store.pipe(select(getDivisionStanding));

  constructor(private store: Store<LeagueState>, @Inject(DIVISION_ORDER) public orderOfDivision: string[]) {}
}
