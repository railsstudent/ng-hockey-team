import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeagueState, TeamActions } from '../../store';

@Component({
  selector: 'team-success-message',
  template: `
    <div class="alert alert-success team-alert" role="alert" *ngIf="msg && !closeAlert">
      <div class="alert-items">
        <div class="alert-item static">
          <div class="alert-icon-wrapper">
            <clr-icon shape="info-standard" size="23"></clr-icon>
          </div>
          <span class="alert-text">{{ msg }}</span>
        </div>
      </div>
      <button type="button" class="close" aria-label="Close" (click)="closeAlertMessage()">
        <clr-icon shape="times-circle"></clr-icon>
      </button>
    </div>
  `,
  styleUrls: ['./team-err-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSuccessMessageComponent implements OnInit {
  @Input()
  msg: string;

  @Input()
  closeAlert: boolean;

  constructor(private store: Store<LeagueState>) {}

  ngOnInit() {}

  closeAlertMessage() {
    this.store.dispatch(TeamActions.UpdateCloseAlert({ closeAlert: true }));
  }
}
