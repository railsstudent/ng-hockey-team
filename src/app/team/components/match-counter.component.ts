import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateTeamDelta } from '../models';

@Component({
  selector: 'team-match-counter',
  template: `
    <section class="counter">
      <a href aria-label="Decrement value" (click)="decrementValue($event)">
        <i class="fas fa-minus-circle fa-2x"></i>
      </a>
      <p class="text-cell">{{ value }}</p>
      <a href aria-label="Increment value" (click)="incrementValue($event)">
        <i class="fas fa-plus-circle fa-2x"></i>
      </a>
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
