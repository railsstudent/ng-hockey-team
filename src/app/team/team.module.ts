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
  TeamTablesComponent,
  TeamTitleComponent,
} from './components';
import {
  DivisionStandingContainer,
  ListingContainer,
  NewTeamContainer,
  TeamAnalysisContainer,
  TeamRosterContainer,
  TeamStatisticsContainer,
} from './containers/';
import { TeamCounterArrowsVisibleDirective } from './directives';
import { TeamGuard } from './guards';
import { reducers, TeamEffects } from './store';
import { TeamMenuCardModule } from './team-menu-card';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
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
    TeamTitleComponent,
    TeamTablesComponent,
    TeamStatisticsContainer,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('teams', reducers.teams),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
    TeamMenuCardModule,
  ],
  providers: [TeamGuard],
})
export class TeamModule {}