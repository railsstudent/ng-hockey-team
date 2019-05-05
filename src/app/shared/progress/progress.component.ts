import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `
    <div class="progress loop"><progress></progress></div>
  `,
  styles: [
    `
      progress {
        height: 0.125rem;
      }

      div.progress {
        height: 0.125rem;
        min-height: 0.125rem;
        max-height: 0.125rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {}
