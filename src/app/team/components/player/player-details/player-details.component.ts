import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { differenceInYears, parse } from 'date-fns';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { getAlertCloseAlert } from 'src/app/store';
import { Player } from 'src/app/team/models';
import { PlayerService } from 'src/app/team/services';
import {
  getNationalities,
  getPlayerErrorMessage,
  getPlayerMessage,
  getTeamNameMap,
  LeagueState,
  PlayerActions,
} from 'src/app/team/store';
import {
  distinctUniformNumValidator,
  freeAgentValidator,
  futureTimeValidator,
  minimumAgeValidator,
  singleTitleValidator,
  uniformNumValidator,
} from 'src/app/team/validators';

const MIN_AGE = 18;

@Component({
  selector: 'player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  @Input()
  player: Player;

  form: FormGroup;

  minAge = MIN_AGE;
  error$ = this.store.pipe(select(getPlayerErrorMessage));
  message$ = this.store.pipe(select(getPlayerMessage));
  closeAlert$ = this.store.pipe(select(getAlertCloseAlert));
  teamNames$ = this.store.pipe(select(getTeamNameMap));
  nationality$ = this.store.pipe(select(getNationalities));
  unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder, private store: Store<LeagueState>, private playerService: PlayerService) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.player.name, { validators: [Validators.required], updateOn: 'blur' }),
        dob: new FormControl(this.player.dob, {
          validators: [Validators.required, minimumAgeValidator(MIN_AGE), futureTimeValidator()],
          updateOn: 'blur',
        }),
        nationality: new FormControl(this.player.nationality, { validators: [Validators.required] }),
        position: new FormControl(this.player.position, { validators: [Validators.required] }),
        shootingHand: new FormControl(this.player.shootingHand, { validators: [Validators.required] }),
        team: new FormControl(this.player.team),
        isCaptain: new FormControl(this.player.isCaptain, { validators: [Validators.required] }),
        isAssistantCaptain: new FormControl(this.player.isAssistantCaptain, { validators: [Validators.required] }),
        yearOfExperience: new FormControl(this.player.yearOfExperience, {
          validators: [Validators.required, Validators.min(0)],
        }),
        uniformNo: new FormControl(this.player.uniformNo),
        age: new FormControl(this.player.age),
        id: new FormControl(this.player.id),
      },
      {
        validators: [singleTitleValidator(), uniformNumValidator(), freeAgentValidator()],
        asyncValidators: [distinctUniformNumValidator(this.playerService)],
      },
    );

    this.dob.valueChanges
      .pipe(
        map(dob => differenceInYears(new Date(), parse(dob, 'MM/dd/yyyy', new Date()))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(age => {
        this.age.setValue(age);
      });
  }

  // convertMdyDate(value: string) {
  //   const [yyyy, mm, dd] = value.split('/');
  //   return `${mm}/${dd}/${yyyy}`;
  // }

  get playerName() {
    return this.form && (this.form.controls.name as AbstractControl);
  }

  get dob() {
    return this.form && (this.form.controls.dob as AbstractControl);
  }

  get nationality() {
    return this.form && (this.form.controls.nationality as AbstractControl);
  }

  get yearOfExperience() {
    return this.form && (this.form.controls.yearOfExperience as AbstractControl);
  }

  get age() {
    return this.form && (this.form.controls.age as AbstractControl);
  }

  saveDetails($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.store.dispatch(
      PlayerActions.UpdatePlayer({
        player: this.form.value,
      }),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
