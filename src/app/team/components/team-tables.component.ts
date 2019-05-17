import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'team-tables',
  template: `
    <div class="team-tables">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamTablesComponent {}
