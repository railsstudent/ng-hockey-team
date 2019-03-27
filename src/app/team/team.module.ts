import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import { TeamEffects } from './effects';
import { reducers } from './reducers';
import { TeamContainerComponent } from './team-container/team-container.component';
import { TeamMenuCardComponent } from './team-menu-card/team-menu-card.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [TeamContainerComponent, TeamMenuCardComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('teams', reducers),
    EffectsModule.forFeature([TeamEffects]),
    SharedModule,
  ],
})
export class TeamModule {}
