import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, mapTo, takeUntil, tap } from 'rxjs/operators';
import { UpdateTeamDelta } from '../../models';

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
          <clr-icon shape="angle"></clr-icon>
        </a>
        <a
          href
          aria-label="Decrement value"
          (click)="$event.preventDefault(); $event.stopPropagation(); decrementValue$.next($event)"
          class="down-arrow"
        >
          <clr-icon shape="angle" dir="down"></clr-icon>
        </a>
      </div>
    </section>
  `,
  styleUrls: ['./match-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCounterComponent implements OnInit, OnDestroy {
  @Input()
  value: number;

  @Input()
  field: string;

  @Output()
  counter = new EventEmitter<UpdateTeamDelta>();

  incrementValue$ = new Subject<Event>();
  decrementValue$ = new Subject<Event>();
  unsubscribe$ = new Subject();

  ngOnInit() {
    const plusOne$ = this.incrementValue$.pipe(mapTo(1));

    const minusOne$ = this.decrementValue$.pipe(
      filter(() => this.value > 0),
      mapTo(-1),
    );

    merge(plusOne$, minusOne$)
      .pipe(
        tap(delta => this.counter.emit({ delta, field: this.field })),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
