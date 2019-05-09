import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-title',
  templateUrl: './team-title.component.html',
  styleUrls: ['./team-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamTitleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
