import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'team-listing',
  templateUrl: './team-listing-container.component.html',
  styleUrls: ['./team-listing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamListingContainerComponent implements OnInit {
  constructor(private store: Store<TeamState>) {}

  ngOnInit() {}
}
