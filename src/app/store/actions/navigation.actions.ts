import { Params } from '@angular/router';
import { createAction } from '@ngrx/store';

export const NextRoute = createAction(
  '[Navigation] Navigate to next url',
  (url: string, pathParams: any[] = [], queryParams: Params = {}) => ({ url, pathParams, queryParams }),
);
