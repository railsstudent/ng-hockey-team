import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortalService } from 'src/app/core';
import { NavigationActions } from 'src/app/store';
import { LeagueState } from '../store';

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
    this.store.dispatch(NavigationActions.NextRoute('/team/players/new'));
  }

  openPlayerList() {
    this.store.dispatch(NavigationActions.NextRoute('/team/players/list'));
  }
}
