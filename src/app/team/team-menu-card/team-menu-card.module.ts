import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { TeamMenuCardComponent } from './team-menu-card.component';

@NgModule({
  declarations: [TeamMenuCardComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [TeamMenuCardComponent],
})
export class TeamMenuCardModule {}
