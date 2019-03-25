import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamContainerComponent } from './team-container/team-container.component';

const routes: Routes = [
  {
    path: '',
    component: TeamContainerComponent,
  },
  {
    path: 'player',
    component: TeamContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
