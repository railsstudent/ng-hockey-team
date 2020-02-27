import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import {
  MatchCounterComponent,
  PlayerSummaryComponent,
  TeamComponent,
  TeamStandingTableComponent,
  TeamStatHorizontalTableComponent,
  TeamStatVerticalTableComponent,
  TeamTitleComponent,
} from './components';
import {
  DivisionStandingContainer,
  ListingContainer,
  ListPlayerContainer,
  NewPlayerContainer,
  NewTeamContainer,
  TeamAnalysisContainer,
  TeamRosterContainer,
  TeamStatisticsContainer,
} from './containers/';
import { TeamCounterArrowsVisibleDirective } from './directives';
import { TeamGuard } from './guards';
import { LeaderCodePipe } from './pipes';
import { PlayerMenuCardModule } from './player-menu-card';
import { PlayerEffects, reducers, TeamEffects } from './store';
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
    TeamStatisticsContainer,
    NewPlayerContainer,
    PlayerSummaryComponent,
    LeaderCodePipe,
    ListPlayerContainer,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('teams', reducers.teams),
    StoreModule.forFeature('players', reducers.players),
    EffectsModule.forFeature([TeamEffects, PlayerEffects]),
    SharedModule,
    TeamMenuCardModule,
    PlayerMenuCardModule,
  ],
  providers: [TeamGuard],
})
export class TeamModule {}
