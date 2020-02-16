import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewPlayer, PLAYER_POSITION, SHOOTING_HAND } from '../../models';
import { getPlayerCloseAlert, getPlayerErrorMessage, getPlayerMessage, getTeamNameMap, LeagueState } from '../../store';

const MIN_AGE = 18;

@Component({
  selector: 'player-new-player-container',
  templateUrl: './new-player.container.html',
  styleUrls: ['./new-player.container.scss'],
})
export class NewPlayerContainer implements OnInit, OnDestroy {
  @ViewChild('f', { static: true })
  f: FormGroupDirective;

  error$ = this.store.pipe(select(getPlayerErrorMessage));
  message$ = this.store.pipe(select(getPlayerMessage));
  closeAlert$ = this.store.pipe(select(getPlayerCloseAlert));
  addPlayer$ = new Subject<NewPlayer>();
  teamNames: { [key: string]: string } = {};

  form: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<LeagueState>, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store
      .pipe(select(getTeamNameMap))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => {
        this.teamNames = { '': '', ...v };
        this.cdr.markForCheck();
      });

    this.form = this.fb.group({
      name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      dob: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl(MIN_AGE, { validators: [Validators.required, Validators.min(MIN_AGE)] }),
      nationality: new FormControl('', { validators: [Validators.required] }),
      position: new FormControl(PLAYER_POSITION.CENTER, { validators: [Validators.required] }),
      shootingHand: new FormControl(SHOOTING_HAND.RIGHT, { validators: [Validators.required] }),
      team: new FormControl(''),
      isCaptain: new FormControl('false', { validators: [Validators.required] }),
      isAssistantCaptain: new FormControl('false', { validators: [Validators.required] }),
      yearOfExperience: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    });

    this.addPlayer$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
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
    });
  }

  get yearOfExperience() {
    return this.form.controls && (this.form.controls.yearOfExperience as AbstractControl);
  }

  get age() {
    return this.form.controls && (this.form.controls.age as AbstractControl);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
