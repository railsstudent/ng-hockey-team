import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  currentYear = new Date().getFullYear();

  repo = environment.repo;
  unsubscribe$ = new Subject();
  collapsed = false;
  version = environment.version;

  constructor(titleService: Title, private breakpointObserver: BreakpointObserver) {
    titleService.setTitle('NG Hockey League');
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 992px)'])
      .pipe(
        map(x => x.matches),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(value => (this.collapsed = value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
