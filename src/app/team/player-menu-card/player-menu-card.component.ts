import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortalService } from 'src/app/core';
import { LeagueState, PlayerActions } from '../store';

@Component({
  selector: 'player-menu-card',
  templateUrl: './player-menu-card.component.html',
  styleUrls: ['./player-menu-card.component.scss'],
})
export class PlayerMenuCardComponent implements OnInit {
  @ViewChild('playerMenu', { static: true })
  playerTemplate: TemplateRef<any>;

  constructor(private portalService: PortalService, private vcf: ViewContainerRef, private store: Store<LeagueState>) {}

  ngOnInit() {
    this.portalService.setPortal(new TemplatePortal(this.playerTemplate, this.vcf));
  }

  openAddPlayerForm() {
    this.store.dispatch(PlayerActions.NavigateAction('/team/players/new'));
  }

  openPlayerList() {
    this.store.dispatch(PlayerActions.NavigateAction('/team/players/list'));
  }
}
