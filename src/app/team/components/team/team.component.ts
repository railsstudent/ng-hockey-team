import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import logos from '../../../../assets/logos.json';
import { TeamWithPercentages } from './../../models';

@Component({
  selector: 'team-summary',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  @Input()
  team: TeamWithPercentages;

  @Input()
  index: number;

  @Output()
  gotoTeam = new EventEmitter<string>();

  @Output()
  deleteTeam = new EventEmitter<string>();

  opened = false;

  getLogoUrl() {
    return logos[this.index % logos.length];
  }

  showTeamRoster() {
    this.gotoTeam.emit(this.team.id);
  }

  openDeleteDialog() {
    this.opened = true;
  }

  closeDeleteDialog() {
    this.deleteTeam.emit(this.team.id);
    this.opened = false;
  }
}
