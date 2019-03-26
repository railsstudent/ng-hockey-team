import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TeamContainerComponent } from './team-container/team-container.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamEffects } from './team.effects';
import { teamReducer } from './team.reducer';

@NgModule({
  declarations: [TeamContainerComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    StoreModule.forFeature('team', teamReducer),
    EffectsModule.forFeature([TeamEffects]),
  ],
})
export class TeamModule {}
