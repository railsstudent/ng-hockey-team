import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamWithPercentages, UpdateTeamValue } from '../../models';

@Component({
  selector: 'team-stat-vertical-table',
  templateUrl: './team-stat-vertical-table.component.html',
  styleUrls: ['./team-stat-vertical-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatVerticalTableComponent {
  @Input()
  team: TeamWithPercentages;

  @Input()
  overtimeArrowsVisible: boolean;

  @Input()
  goalsForVisible: boolean;

  @Input()
  goalsAgainstVisible: boolean;

  @Output()
  updateWin = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateLoss = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateDraw = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateOvertimeWin = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateOvertimeLoss = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateGoalsFor = new EventEmitter<UpdateTeamValue>();

  @Output()
  updateGoalsAgainst = new EventEmitter<UpdateTeamValue>();
}
