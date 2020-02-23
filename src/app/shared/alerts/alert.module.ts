import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ErrMessageComponent } from './err-message.component';
import { SuccessMessageComponent } from './success-message.component';

@NgModule({
  declarations: [ErrMessageComponent, SuccessMessageComponent],
  imports: [CommonModule, ClarityModule],
  exports: [ErrMessageComponent, SuccessMessageComponent, ClarityModule],
})
export class AlertModule {}
