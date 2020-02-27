import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressService } from '../../../shared/';
import { LeagueState, PlayerActions } from '../../store';

@Component({
  selector: 'player-list',
  templateUrl: './list-player.container.html',
  styleUrls: ['./list-player.container.scss'],
})
export class ListPlayerContainer implements OnInit {
  constructor(private store: Store<LeagueState>, private progress: ProgressService) {}

  ngOnInit() {
    this.store.dispatch(PlayerActions.LoadPlayers());
  }
}
