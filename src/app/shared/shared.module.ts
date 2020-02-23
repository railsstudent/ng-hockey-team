import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { AlertModule } from './alerts';
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
    LayoutModule,
    CustomContentLoaderComponent,
    ContentLoaderDirective,
    AlertModule,
  ],
  entryComponents: [CustomContentLoaderComponent],
})
export class SharedModule {}
