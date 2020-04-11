import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getAlertCloseAlert } from 'src/app/store';
import { Player } from 'src/app/team/models';
import { PlayerService } from 'src/app/team/services';
import {
  getNationalities,
  getPlayerErrorMessage,
  getPlayerMessage,
  getTeamNameMap,
  LeagueState,
} from 'src/app/team/store';
import {
  distinctUniformNumValidator,
  freeAgentValidator,
  futureTimeValidator,
  minimumAgeValidator,
  singlePositionValidator,
  uniformNumValidator,
} from 'src/app/team/validators';

const MIN_AGE = 18;

@Component({
  selector: 'player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit {
  @Input()
  player: Player;

  form: FormGroup;

  minAge = MIN_AGE;
  error$ = this.store.pipe(select(getPlayerErrorMessage));
  message$ = this.store.pipe(select(getPlayerMessage));
  closeAlert$ = this.store.pipe(select(getAlertCloseAlert));
  teamNames$ = this.store.pipe(select(getTeamNameMap));
  nationality$ = this.store.pipe(select(getNationalities));

  constructor(private fb: FormBuilder, private store: Store<LeagueState>, private playerService: PlayerService) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.player.name, { validators: [Validators.required], updateOn: 'blur' }),
        dob: new FormControl(this.convertMdyDate(this.player.dob), {
          validators: [Validators.required, minimumAgeValidator(MIN_AGE), futureTimeValidator()],
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
      },
      {
        validators: [singlePositionValidator(), uniformNumValidator(), freeAgentValidator()],
        asyncValidators: distinctUniformNumValidator(this.playerService),
      },
    );
  }

  convertMdyDate(value: string) {
    const [yyyy, mm, dd] = value.split('/');
    return `${mm}/${dd}/${yyyy}`;
  }

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

  saveDetails($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();

    console.log(this.form.value);
  }
}
