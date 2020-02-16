import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { NewPlayer, PLAYER_POSITION, SHOOTING_HAND } from '../../models';
import { getPlayerCloseAlert, getPlayerErrorMessage, getPlayerMessage, LeagueState } from '../../store';

const MIN_AGE = 18;

@Component({
  selector: 'player-new-player-container',
  templateUrl: './new-player.container.html',
  styleUrls: ['./new-player.container.scss'],
})
export class NewPlayerContainer implements OnInit, OnDestroy {
  error$ = this.store.pipe(select(getPlayerErrorMessage));
  message$ = this.store.pipe(select(getPlayerMessage));
  closeAlert$ = this.store.pipe(select(getPlayerCloseAlert));
  addPlayer$ = new Subject<NewPlayer>();

  form: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<LeagueState>, private fb: FormBuilder) {}

  ngOnInit() {
    //     export interface NewPlayer {
    //   name: string;
    //   dob: Date;
    //   age: number;
    //   nationality: string;
    //   position: PLAYER_POSITION;
    //   shootingHand?: SHOOTING_HAND;
    //   team?: {
    //     id: string;
    //     name: string;
    //   };
    //   isCaptain: boolean;
    //   isAssistantCaptain: boolean;
    //   yearOfExperience: number;
    // }

    this.form = this.fb.group({
      name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      dob: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl(0, { validators: [Validators.required, Validators.min(MIN_AGE)] }),
      nationality: new FormControl('', { validators: [Validators.required] }),
      position: new FormControl(PLAYER_POSITION.CENTER, { validators: [Validators.required] }),
      shootingHand: new FormControl(SHOOTING_HAND.RIGHT, { validators: [Validators.required] }),
      team: new FormControl(null),
      isCaptain: new FormControl(false, { validators: [Validators.required] }),
      isAssistantCaptain: new FormControl(false, { validators: [Validators.required] }),
      yearOfExperience: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
