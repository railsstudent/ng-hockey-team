import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player, PLAYER_POSITION, SHOOTING_HAND } from 'src/app/team/models';
import { futureTimeValidator, minimumAgeValidator } from 'src/app/team/validators';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(this.player.name, { validators: [Validators.required], updateOn: 'blur' }),
      dob: new FormControl(this.player.dob, {
        validators: [Validators.required, minimumAgeValidator(MIN_AGE), futureTimeValidator()],
      }),
      nationality: new FormControl(this.player.nationality, { validators: [Validators.required] }),
      position: new FormControl(this.player.position, { validators: [Validators.required] }),
      shootingHand: new FormControl(this.player.shootingHand, { validators: [Validators.required] }),
      team: new FormControl(this.player.team || ''),
      isCaptain: new FormControl(this.player.isCaptain, { validators: [Validators.required] }),
      isAssistantCaptain: new FormControl(this.player.isAssistantCaptain, { validators: [Validators.required] }),
      yearOfExperience: new FormControl(this.player.yearOfExperience, {
        validators: [Validators.required, Validators.min(0)],
      }),
      uniformNo: new FormControl(this.player.uniformNo || ''),
    });
  }

  get playerName() {
    return this.form && (this.form.controls.name as AbstractControl);
  }

  get dateOfBirth() {
    return this.form && (this.form.controls.dob as AbstractControl);
  }

  get nationality() {
    return this.form && (this.form.controls.nationality as AbstractControl);
  }

  saveDetails($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();

    console.log(this.form.value);
  }
}
