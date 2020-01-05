import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { UpdateTeamValue } from '../../models';

const DEBOUNCE_TIME = 700;

@Component({
  selector: 'team-match-counter',
  template: `
    <form clrForm [formGroup]="form" novalidate>
      <input clrInput type="number" min="0" formControlName="counter" />
    </form>
  `,
  styleUrls: ['./match-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCounterComponent implements OnInit, OnDestroy {
  @Input()
  value: number;

  @Input()
  field: string;

  @Input()
  enabled = true;

  @Output()
  counterUpdated = new EventEmitter<UpdateTeamValue>();

  unsubscribe$ = new Subject();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      counter: new FormControl({ value: this.value, disabled: !this.enabled }, { updateOn: 'change' }),
    });

    this.counter.valueChanges
      .pipe(
        filter(v => typeof v !== 'undefined' && v !== null),
        debounceTime(DEBOUNCE_TIME),
        startWith(this.value),
        pairwise(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([prevValue, currValue]) => {
        if (currValue < 0) {
          this.counter.setValue(prevValue);
        } else {
          this.counterUpdated.emit({ value: this.counter.value, field: this.field });
        }
      });
  }

  get counter() {
    return this.form.controls.counter as AbstractControl;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
