import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationActions } from 'src/app/store';
import { PortalService } from '../../core';
import { LeagueState } from '../store';

@Component({
  selector: 'team-menu-card',
  templateUrl: './team-menu-card.component.html',
  styleUrls: ['./team-menu-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMenuCardComponent implements OnInit {
  @ViewChild('teamMenu', { static: true })
  teamTemplate: TemplateRef<any>;

  constructor(private portalService: PortalService, private vcf: ViewContainerRef, private store: Store<LeagueState>) {}

  ngOnInit() {
    this.portalService.setPortal(new TemplatePortal(this.teamTemplate, this.vcf));
  }

  openAddTeamForm() {
    this.store.dispatch(NavigationActions.NextRoute('/team/new'));
  }
}
