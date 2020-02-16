import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListingContainer,
  NewPlayerContainer,
  NewTeamContainer,
  TeamRosterContainer,
  TeamStatisticsContainer,
} from './containers';
import { TeamGuard } from './guards';
import { PlayerMenuCardComponent } from './player-menu-card';
import { TeamMenuCardComponent } from './team-menu-card';

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
    path: 'statistcs',
    component: TeamStatisticsContainer,
    canActivate: [TeamGuard],
  },
  {
    path: 'roster/:teamId',
    component: TeamRosterContainer,
    canActivate: [TeamGuard],
  },
  {
    path: 'players',
    component: PlayerMenuCardComponent,
  },
  {
    path: 'players/new',
    component: NewPlayerContainer,
    canActivate: [TeamGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
