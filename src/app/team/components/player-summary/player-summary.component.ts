import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
})
export class PlayerSummaryComponent implements OnInit {
  @Input()
  player: Player;

  @Input()
  nationalityDisplay = '';

  constructor() {}

  ngOnInit() {}
}
