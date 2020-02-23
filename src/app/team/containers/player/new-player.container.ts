import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { delay, finalize, takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { AlertActions, getAlertCloseAlert } from '../../../store';
import { NewPlayer, PLAYER_POSITION, SHOOTING_HAND } from '../../models';
import { PlayerService } from '../../services';
import {
  getPlayerErrorMessage,
  getPlayerLoading,
  getPlayerMessage,
  getTeamNameMap,
  LeagueState,
  PlayerActions,
} from '../../store';
import { futureTimeValidator, minimumAgeValidator, singlePositionValidator } from '../../validators';

const MIN_AGE = 18;

@Component({
  selector: 'player-new-player-container',
  templateUrl: './new-player.container.html',
  styleUrls: ['./new-player.container.scss'],
})
export class NewPlayerContainer implements OnInit, OnDestroy {
  @ViewChild('f', { static: true })
  f: FormGroupDirective;

  minAge = MIN_AGE;

  error$ = this.store.pipe(select(getPlayerErrorMessage));
  message$ = this.store.pipe(select(getPlayerMessage));
  closeAlert$ = this.store.pipe(select(getAlertCloseAlert));
  addPlayer$ = new Subject<NewPlayer>();
  teamNames: { [key: string]: string } = {};
  nationality$ = this.service.nationality$;
  loading$ = this.store.pipe(select(getPlayerLoading));

  form: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<LeagueState>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: PlayerService,
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(getTeamNameMap))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => {
        this.teamNames = { '': '', ...v };
        this.cdr.markForCheck();
      });

    this.form = this.fb.group(
      {
        name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
        dob: new FormControl('', {
          validators: [Validators.required, minimumAgeValidator(MIN_AGE), futureTimeValidator()],
        }),
        nationality: new FormControl('', { validators: [Validators.required] }),
        position: new FormControl(PLAYER_POSITION.CENTER, { validators: [Validators.required] }),
        shootingHand: new FormControl(SHOOTING_HAND.RIGHT, { validators: [Validators.required] }),
        team: new FormControl(''),
        isCaptain: new FormControl('false', { validators: [Validators.required] }),
        isAssistantCaptain: new FormControl('false', { validators: [Validators.required] }),
        yearOfExperience: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
      },
      { validators: singlePositionValidator() },
    );

    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();

    this.addPlayer$
      .pipe(
        delay(0),
        tap(() => this.progress.show()),
        tap(newPlayer => this.store.dispatch(PlayerActions.addPlayer({ newPlayer }))),
        finalize(() => this.progress.hide()),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.f.resetForm();
        this.form.reset({
          name: '',
          dob: '',
          age: MIN_AGE,
          nationality: '',
          position: PLAYER_POSITION.CENTER,
          shootingHand: SHOOTING_HAND.RIGHT,
          team: '',
          isCaptain: 'false',
          isAssistantCaptain: 'false',
          yearOfExperience: 0,
        });
        this.store.dispatch(AlertActions.openAlert());
      });

    this.service.getNationalities();
  }

  get yearOfExperience() {
    return this.form.controls && (this.form.controls.yearOfExperience as AbstractControl);
  }

  get dob() {
    return this.form.controls && (this.form.controls.dob as AbstractControl);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
