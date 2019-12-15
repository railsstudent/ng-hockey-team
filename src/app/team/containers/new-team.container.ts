import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from '../../shared/progress.service';
import { getCloseAlert, getTeamErrorMessage, getTeamLoading, getTeamMessage, LeagueState, TeamActions } from '../store';

@Component({
  templateUrl: './new-team.container.html',
  styleUrls: ['./new-team.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainer implements OnInit, OnDestroy {
  @ViewChild('f', { static: true })
  formDirective: NgForm;

  form: FormGroup;
  message$: Observable<string | null>;

  error$ = this.store.pipe(select(getTeamErrorMessage));
  closeAlert$ = this.store.pipe(select(getCloseAlert));
  loading$ = this.store.pipe(select(getTeamLoading));
  addTeam$ = new Subject();
  unsubscribe$ = new Subject();

  constructor(
    private store: Store<LeagueState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      division: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    });

    this.route.queryParams.subscribe(params => {
      const division = params.division || '';
      this.divisionCtrl.setValue(division);
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
        tap(() => this.store.dispatch(TeamActions.AddTeam(this.form.value))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  get divisionCtrl() {
    return this.form.get('division') as AbstractControl;
  }

  closeAlert() {
    this.store.dispatch(TeamActions.UpdateCloseAlert({ closeAlert: true }));
  }

  returnToMenu() {
    this.store.dispatch(TeamActions.NavigateAction('/team'));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
