import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getRouterInfo = createSelector(fromFeature.getRouterFeature, state => state.state);
