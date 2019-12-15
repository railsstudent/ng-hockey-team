import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
  },
  {
    path: '**',
    redirectTo: 'team',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
