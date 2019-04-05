import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-stat-vertical-table',
  templateUrl: './team-stat-vertical-table.component.html',
  styleUrls: ['./team-stat-vertical-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatVerticalTableComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
