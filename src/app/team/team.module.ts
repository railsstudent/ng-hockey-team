import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import {
  MatchCounterComponent,
  TeamComponent,
  TeamOverallStandingComponent,
  TeamStatHorizontalTableComponent,
  TeamStatVerticalTableComponent,
} from './components';
import { ListingContainer, NewTeamContainer, TeamRosterContainer } from './containers/';
import { TeamEffects } from './effects';
import { reducers } from './reducers';
import { TeamMenuCardComponent } from './team-menu-card/team-menu-card.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
    TeamMenuCardComponent,
    ListingContainer,
    NewTeamContainer,
    TeamComponent,
    TeamRosterContainer,
    TeamStatHorizontalTableComponent,
    TeamStatVerticalTableComponent,
    MatchCounterComponent,
    TeamOverallStandingComponent,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('teams', reducers.teams),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
  ],
})
export class TeamModule {}
