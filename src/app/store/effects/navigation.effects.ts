import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NavigationActions } from '../actions';

@Injectable()
export class NavigationEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(NavigationActions.NextRoute.type),
    tap(({ url, queryParams, pathParams }) => this.router.navigate([url, ...(pathParams as any[])], queryParams)),
  );
}
