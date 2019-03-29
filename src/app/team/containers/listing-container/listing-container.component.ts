import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamState } from '../../reducers';

@Component({
  selector: 'team-listing',
  templateUrl: './listing-container.component.html',
  styleUrls: ['./listing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingContainerComponent implements OnInit {
  constructor(private store: Store<TeamState>) {}

  ngOnInit() {}
}
