import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamContainerComponent } from './team-container/team-container.component';
import { TeamMenuCardComponent } from './team-menu-card/team-menu-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamMenuCardComponent,
  },
  {
    path: 'list',
    component: TeamContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
