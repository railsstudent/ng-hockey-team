import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PortalService } from '../services/portal.service';
import { MenuCardComponent } from './menu-card/menu-card.component';

@NgModule({
  declarations: [MenuCardComponent],
  imports: [CommonModule, PortalModule],
  exports: [MenuCardComponent, ReactiveFormsModule, ClarityModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PortalService],
    };
  }
}
