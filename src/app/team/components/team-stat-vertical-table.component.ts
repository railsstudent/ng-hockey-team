import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamWithPoints } from '../models';

@Component({
  selector: 'team-stat-vertical-table',
  templateUrl: './team-stat-vertical-table.component.html',
  styleUrls: ['./team-stat-vertical-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatVerticalTableComponent {
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
