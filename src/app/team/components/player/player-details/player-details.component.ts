import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/team/models';

@Component({
  selector: 'player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit {
  @Input()
  player: Player;

  constructor() {}

  ngOnInit() {}
}
