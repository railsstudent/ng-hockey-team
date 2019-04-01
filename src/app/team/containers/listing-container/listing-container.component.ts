import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HockeyState } from '../../reducers';

@Component({
  selector: 'team-listing',
  templateUrl: './listing-container.component.html',
  styleUrls: ['./listing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingContainerComponent implements OnInit {
  constructor(private store: Store<HockeyState>) {}

  ngOnInit() {}
}
