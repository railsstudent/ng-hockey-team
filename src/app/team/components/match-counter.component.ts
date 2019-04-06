import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'team-match-counter',
  template: `
    <div class="counter">
      <a href aria-label="Decrement value" (click)="decrementValue($event)">
        <i class="fas fa-minus-circle fa-2x"></i>
      </a>
      <p class="text-cell">{{ value }}</p>
      <a href aria-label="Increment value" (click)="incrementValue($event)">
        <i class="fas fa-plus-circle fa-2x"></i>
      </a>
    </div>
  `,
  styleUrls: ['./match-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCounterComponent {
  @Input()
  value: number;

  @Output()
  counter = new EventEmitter<number>();

  incrementValue($event: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    this.counter.emit(1);
  }

  decrementValue($event: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (this.value > 0) {
      this.counter.emit(-1);
    }
  }
}
