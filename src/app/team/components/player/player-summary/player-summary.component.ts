import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../models';

@Component({
  selector: 'player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
})
export class PlayerSummaryComponent implements OnInit {
  @Input()
  player: Player;

  @Output()
  gotoPlayer = new EventEmitter<string>();

  @Output()
  deletePlayer = new EventEmitter<string>();

  // @Input()
  // nationalityDisplay = '';

  constructor() {}

  ngOnInit() {}
}
