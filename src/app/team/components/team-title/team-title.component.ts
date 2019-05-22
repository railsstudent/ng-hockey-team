import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeagueState, TeamActions } from '../../store';

@Component({
  selector: 'team-title',
  templateUrl: './team-title.component.html',
  styleUrls: ['./team-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamTitleComponent {
  @Input()
  url: string;

  constructor(private store: Store<LeagueState>) {}

  back() {
    this.store.dispatch(TeamActions.NavigateAction(this.url));
  }
}
