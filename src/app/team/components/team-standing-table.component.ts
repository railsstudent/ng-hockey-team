import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'team-standing-table',
  template: `
    <ng-template [ngTemplateOutlet]="titleTemplateRef"></ng-template>
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
      table.table {
        margin-top: 0.5rem;
      }

      p.standing-table-title {
        font-weight: bold;
        font-style: italic;
        font-size: 0.8rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStandingTableComponent {
  @Input()
  headerTemplateRef: TemplateRef<any>;

  @Input()
  teamsTemplateRef: TemplateRef<any>;

  @Input()
  titleTemplateRef: TemplateRef<any>;
}