import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CustomContentLoaderComponent } from '../custom-content-loader';

@Directive({
  selector: '[appContentLoaderIf]',
})
export class ContentLoaderDirective implements OnInit, OnDestroy {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  componentRef: ComponentRef<CustomContentLoaderComponent>;

  height: number;

  @Input()
  set appContentLoaderIfHeight(height: number) {
    this.height = height;
  }

  @Input()
  set appContentLoaderIf(val: boolean) {
    this.viewContainerRef.clear();
    if (!val) {
      // show content loader component
      const factory = this.componentFactoryResolver.resolveComponentFactory(CustomContentLoaderComponent);
      this.componentRef = this.viewContainerRef.createComponent(factory);
      this.componentRef.instance.height = this.height;
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
