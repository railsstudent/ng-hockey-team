import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'team-statistics-container',
  templateUrl: './team-statistics.container.html',
  styleUrls: ['./team-statistics.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsContainer implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
