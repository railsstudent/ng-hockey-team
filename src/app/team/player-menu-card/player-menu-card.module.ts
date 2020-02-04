import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { PlayerMenuCardComponent } from './player-menu-card.component';

@NgModule({
  declarations: [PlayerMenuCardComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [PlayerMenuCardComponent],
})
export class PlayerMenuCardModule {}
