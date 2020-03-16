import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Player } from '../../../models';
import { getAllTeams, getNationalities, LeagueState } from '../../../store';

@Component({
  selector: 'player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
})
export class PlayerSummaryComponent implements OnInit, OnDestroy {
  @Input()
  player: Player;

  @Output()
  gotoPlayer = new EventEmitter<string>();

  @Output()
  deletePlayer = new EventEmitter<string>();

  nationality = '';
  teamName = '';

  nationalities$ = this.store.pipe(select(getNationalities));
  allTeams$ = this.store.pipe(select(getAllTeams));

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<LeagueState>) {}

  ngOnInit() {
    this.nationalities$.pipe(takeUntil(this.unsubscribe$)).subscribe(nationalities => {
      this.nationality =
        this.player && this.player.nationality ? nationalities[this.player.nationality] || 'N/A' : 'N/A';
    });

    this.allTeams$.pipe(takeUntil(this.unsubscribe$)).subscribe(teams => {
      const team = teams.find(t => t.id === this.player.team);
      this.teamName = team ? team.name : 'Free Agent';
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
