import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingContainer, NewTeamContainer } from './containers';
import { TeamMenuCardComponent } from './team-menu-card/team-menu-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamMenuCardComponent,
  },
  {
    path: 'new',
    component: NewTeamContainer,
  },
  {
    path: 'list',
    component: ListingContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
