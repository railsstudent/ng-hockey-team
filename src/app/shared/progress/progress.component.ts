import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `
    <div class="progress loop"><progress></progress></div>
  `,
  styles: [
    `
      .progress {
        height: 1px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {}
