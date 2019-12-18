import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { CustomContentLoaderComponent } from './custom-content-loader';
import { ContentLoaderDirective } from './directives';
import { MenuCardComponent } from './menu-card';
import { ProgressModule } from './progress';

@NgModule({
  declarations: [MenuCardComponent, ContentLoaderDirective, CustomContentLoaderComponent],
  imports: [CommonModule, PortalModule, LayoutModule, ProgressModule, ContentLoaderModule],
  exports: [
    MenuCardComponent,
    ReactiveFormsModule,
    ClarityModule,
    LayoutModule,
    CustomContentLoaderComponent,
    ContentLoaderDirective,
  ],
  entryComponents: [CustomContentLoaderComponent],
})
export class SharedModule {}
