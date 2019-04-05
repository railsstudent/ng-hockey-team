import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamWithPoints } from '../models';

@Component({
  selector: 'team-stat-horizontal-table',
  templateUrl: './team-stat-horizontal-table.component.html',
  styleUrls: ['./team-stat-horizontal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatHorizontalTableComponent implements OnInit {
  @Input()
  team: TeamWithPoints;

  @Output()
  updateWin = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
