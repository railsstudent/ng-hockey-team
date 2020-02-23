import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAlert from '../reducers/';

export const getAlertCloseAlert = createSelector(fromFeature.getAlertFeature, fromAlert.getCloseAlert);
