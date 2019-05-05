import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { exhaustMap, takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { getTeamErrorMessage, getTeamLoading, getTeamMessage, LeagueState, TeamActions } from '../store';

@Component({
  templateUrl: './new-team.container.html',
  styleUrls: ['./new-team.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainer implements OnInit, OnDestroy {
  @ViewChild('f')
  formDirective: NgForm;

  form: FormGroup;
  message$: Observable<string | null>;

  error$ = this.store.pipe(select(getTeamErrorMessage));
  loading$ = this.store.pipe(select(getTeamLoading));
  addTeam$ = new Subject();
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<LeagueState>,
    private router: Router,
    private fb: FormBuilder,
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      division: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    });

    this.message$ = this.store.pipe(
      select(getTeamMessage),
      tap(msg => {
        if (msg) {
          this.formDirective.resetForm();
          this.form.reset();
        }
      }),
    );

    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.addTeam$
      .pipe(
        exhaustMap(() => of(this.store.dispatch(new TeamActions.AddTeam(this.form.value)))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['/team']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
