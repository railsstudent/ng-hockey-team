import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingContainer, NewTeamContainer, TeamRosterContainer } from './containers';
import { TeamGuard } from './guards';
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
  {
    path: 'roster/:teamId',
    component: TeamRosterContainer,
    canActivate: [TeamGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
