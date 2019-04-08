import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-overall-standing',
  templateUrl: './team-overall-standing.component.html',
  styleUrls: ['./team-overall-standing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamOverallStandingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
