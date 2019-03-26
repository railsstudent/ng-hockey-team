import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import { TeamContainerComponent } from './team-container/team-container.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamEffects } from './team.effects';
import { teamReducer } from './team.reducer';
import { TeamMenuCardComponent } from './team-menu-card/team-menu-card.component';

@NgModule({
  declarations: [TeamContainerComponent, TeamMenuCardComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('team', teamReducer),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
  ],
})
export class TeamModule {}
