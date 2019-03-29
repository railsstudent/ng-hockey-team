import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamState } from '../../reducers';

@Component({
  selector: 'app-new-team-container',
  templateUrl: './new-team-container.component.html',
  styleUrls: ['./new-team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainerComponent implements OnInit {
  constructor(private store: Store<TeamState>) {}

  ngOnInit() {}
}
