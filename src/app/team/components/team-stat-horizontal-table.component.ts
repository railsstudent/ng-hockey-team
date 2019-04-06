import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamWithPoints } from '../models';

@Component({
  selector: 'team-stat-horizontal-table',
  templateUrl: './team-stat-horizontal-table.component.html',
  styleUrls: ['./team-stat-horizontal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatHorizontalTableComponent {
  @Input()
  team: TeamWithPoints;

  @Output()
  updateWin = new EventEmitter<number>();

  @Output()
  updateLoss = new EventEmitter<number>();

  @Output()
  updateDraw = new EventEmitter<number>();

  @Output()
  updateOvertimeWin = new EventEmitter<number>();

  @Output()
  updateOvertimeLoss = new EventEmitter<number>();
}
