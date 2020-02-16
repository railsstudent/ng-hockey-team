import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UpdateTeamValue } from '../../models';
import { TeamWithPercentages } from './../../models';

@Component({
  selector: 'team-stat-horizontal-table',
  templateUrl: './team-stat-horizontal-table.component.html',
  styleUrls: ['./team-stat-horizontal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatHorizontalTableComponent implements OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    const { team = null } = changes || {};
    const { currentValue = null } = team || {};
    if (currentValue) {
      this.team = currentValue;
    }
  }
}
