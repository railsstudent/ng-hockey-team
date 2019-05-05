import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { UpdateTeamDelta } from '../models';

@Component({
  selector: 'team-match-counter',
  template: `
    <section class="counter">
      <p class="text-cell">{{ value }}</p>
      <div class="value-change-wrapper">
        <a
          href
          aria-label="Increment value"
          (click)="$event.preventDefault(); $event.stopPropagation(); incrementValue$.next()"
          class="up-arrow"
        >
          <i class="fas fa-angle-up"></i>
        </a>
        <a
          href
          aria-label="Decrement value"
          (click)="$event.preventDefault(); $event.stopPropagation(); decrementValue$.next($event)"
          class="down-arrow"
        >
          <i class="fas fa-angle-down"></i>
        </a>
      </div>
    </section>
  `,
  styleUrls: ['./match-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCounterComponent implements OnInit {
  @Input()
  value: number;

  @Input()
  field: string;

  @Output()
  counter = new EventEmitter<UpdateTeamDelta>();

  incrementValue$ = new Subject<Event>();
  decrementValue$ = new Subject<Event>();

  ngOnInit() {
    const plusOne$ = this.incrementValue$.pipe(mapTo(1));

    const minusOne$ = this.decrementValue$.pipe(
      filter(() => this.value > 0),
      mapTo(-1),
    );

    merge(plusOne$, minusOne$)
      .pipe(tap(delta => this.counter.emit({ delta, field: this.field })))
      .subscribe();
  }
}
