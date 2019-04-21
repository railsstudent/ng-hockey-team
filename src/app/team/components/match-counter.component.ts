import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateTeamDelta } from '../models';

@Component({
  selector: 'team-match-counter',
  template: `
    <section class="counter">
      <p class="text-cell">{{ value }}</p>
      <div class="value-change-wrapper">
        <a href aria-label="Increment value" (click)="incrementValue($event)" class="up-arrow">
          <i class="fas fa-angle-up"></i>
        </a>
        <a href aria-label="Decrement value" (click)="decrementValue($event)" class="down-arrow" *ngIf="value > 0">
          <i class="fas fa-angle-down"></i>
        </a>
      </div>
    </section>
  `,
  styleUrls: ['./match-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCounterComponent {
  @Input()
  value: number;

  @Input()
  field: string;

  @Output()
  counter = new EventEmitter<UpdateTeamDelta>();

  incrementValue($event: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    this.counter.emit({ delta: 1, field: this.field });
  }

  decrementValue($event: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (this.value > 0) {
      this.counter.emit({ delta: -1, field: this.field });
    }
  }
}
