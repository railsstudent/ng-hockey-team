import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import logos from '../../../assets/logos.json';
import { Team } from '../models';

@Component({
  selector: 'team-summary',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  @Input()
  team: Team;

  @Input()
  index: number;

  getLogoUrl() {
    return logos[this.index % logos.length];
  }
}
