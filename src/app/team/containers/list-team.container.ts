import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { TeamWithPercentages } from '../models';
import { getAllTeamWithPercentages, getTeamLoading, LeagueState, TeamActions } from '../store';

@Component({
  templateUrl: './list-team.container.html',
  styles: [
    `
      .list-container {
        display: grid;
        grid-template-rows: 1fr auto;
      }

      .team-container {
        display: grid;
        min-height: 100%;

        grid-template-rows: max-content 1fr;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingContainer implements OnInit, OnDestroy {
  teams$ = this.store.pipe(select(getAllTeamWithPercentages));
  loading$ = this.store.pipe(select(getTeamLoading));

  private unsubscribe$ = new Subject();

  constructor(private store: Store<LeagueState>, private progress: ProgressService) {}

  ngOnInit() {
    console.log('teams$', this.teams$);
    console.log('loading$', this.loading$);

    this.store.dispatch(TeamActions.LoadTeams());
    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.store.dispatch(TeamActions.NavigateAction('/team'));
  }

  trackByFunction(index: number, team: TeamWithPercentages) {
    return team.id;
  }

  showTeamRoster(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(TeamActions.NavigateAction(url, pathParams));
  }

  deleteCurrentTeam(teamId: string) {
    this.store.dispatch(TeamActions.DeleteTeam({ teamId }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
