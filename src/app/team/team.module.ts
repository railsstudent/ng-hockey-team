import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import {
  MatchCounterComponent,
  TeamComponent,
  TeamStandingTableComponent,
  TeamStatHorizontalTableComponent,
  TeamStatVerticalTableComponent,
} from './components';
import {
  DivisionStandingContainer,
  ListingContainer,
  NewTeamContainer,
  TeamAnalysisContainer,
  TeamRosterContainer,
} from './containers/';
import { TeamCounterArrowsVisibleDirective } from './directives';
import { TeamGuard } from './guards';
import { reducers, TeamEffects } from './store';
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
    TeamStandingTableComponent,
    TeamAnalysisContainer,
    TeamCounterArrowsVisibleDirective,
    DivisionStandingContainer,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('teams', reducers.teams),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
  ],
  providers: [TeamGuard],
})
export class TeamModule {}
