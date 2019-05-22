import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { MenuCardComponent } from './menu-card';
import { ProgressModule } from './progress';

@NgModule({
  declarations: [MenuCardComponent],
  imports: [CommonModule, PortalModule, LayoutModule, ProgressModule],
  exports: [MenuCardComponent, ReactiveFormsModule, ClarityModule, LayoutModule],
})
export class SharedModule {}

export const BAD_WORDS = new InjectionToken('BAD_WORDS');
export const DIVISION_ORDER = new InjectionToken('DIVISON_ORDER');
