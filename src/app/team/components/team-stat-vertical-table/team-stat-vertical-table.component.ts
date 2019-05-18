import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamWithPercentages, UpdateTeamDelta } from '../../models';

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
  updateWin = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateLoss = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateDraw = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateOvertimeWin = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateOvertimeLoss = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateGoalsFor = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateGoalsAgainst = new EventEmitter<UpdateTeamDelta>();
}
