import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions) {}
}
