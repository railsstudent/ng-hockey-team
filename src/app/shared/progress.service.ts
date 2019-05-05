import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { ProgressComponent } from './progress/progress.component';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private showProgress = false;
  private progressRef: ComponentRef<ProgressComponent>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  show() {
    const container = this.document.querySelector('#progress');
    if (container) {
      if (!this.showProgress) {
        const factory = this.resolver.resolveComponentFactory(ProgressComponent);
        const componentRef = factory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const progressEl = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        container.appendChild(progressEl);
        this.progressRef = componentRef;
        this.showProgress = true;
      }
    }
  }

  hide() {
    if (this.showProgress) {
      this.appRef.detachView(this.progressRef.hostView);
      this.progressRef.destroy();
      this.showProgress = false;
    }
  }
}
