import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-loader',
  template: `
    <content-loader [height]="height">
      <svg:rect x="20" y="20" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="35" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="50" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="65" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="80" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="95" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="110" rx="3" ry="3" width="250" height="5" />
      <svg:rect x="20" y="125" rx="3" ry="3" width="250" height="5" />
    </content-loader>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomContentLoaderComponent implements OnInit {
  @Input()
  height: number;

  constructor() {}

  ngOnInit() {
    console.log('this.height', this.height);
  }
}
