import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'team-standing-table',
  templateUrl: './team-standing-table.component.html',
  styleUrls: ['./team-standing-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStandingTableComponent {
  @Input()
  title: string;

  @Input()
  headerTemplateRef: TemplateRef<any>;

  @Input()
  teamsTemplateRef: TemplateRef<any>;

  constructor() {}
}
