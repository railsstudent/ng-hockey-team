import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'team-menu-card',
  templateUrl: './team-menu-card.component.html',
  styleUrls: ['./team-menu-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMenuCardComponent implements OnInit {
  @ViewChild('teamMenu')
  teamTemplate: TemplateRef<any>;

  constructor(private portalService: PortalService, private vcf: ViewContainerRef) {}

  ngOnInit() {
    this.portalService.setPortal(new TemplatePortal(this.teamTemplate, this.vcf));
  }
}
