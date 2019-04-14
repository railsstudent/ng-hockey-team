import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'team-standing-table',
  template: `
    <p class="standing-table-title">{{ title }}</p>
    <table class="table">
      <thead>
        <ng-template [ngTemplateOutlet]="headerTemplateRef"></ng-template>
      </thead>
      <tbody>
        <ng-template [ngTemplateOutlet]="teamsTemplateRef"></ng-template>
      </tbody>
    </table>
  `,
  styles: [
    `
      .standing-table-title {
        font-size: 0.75rem;
        text-align: center;
        text-decoration: underline;
        margin-top: 0rem;
      }

      table.table {
        margin-top: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStandingTableComponent {
  @Input()
  title: string;

  @Input()
  headerTemplateRef: TemplateRef<any>;

  @Input()
  teamsTemplateRef: TemplateRef<any>;
}
