import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/shared/progress.service';
import { TeamWithPoints } from '../models';
import { getAllTeamPoints, getTeamLoading, LeagueState, TeamActions } from '../store';

@Component({
  templateUrl: './list-team.container.html',
  styleUrls: ['./list-team.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingContainer implements OnInit, OnDestroy {
  teams$ = this.store.pipe(select(getAllTeamPoints));
  loading$ = this.store.pipe(select(getTeamLoading));

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<LeagueState>,
    private router: Router,
    private route: ActivatedRoute,
    private progress: ProgressService,
  ) {}

  ngOnInit() {
    this.store.dispatch(new TeamActions.LoadTeams());
    this.loading$
      .pipe(
        tap(value => (value ? this.progress.show() : this.progress.hide())),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  trackByFunction(index: number, team: TeamWithPoints) {
    return team.id;
  }

  showTeamRoster(teamId: string) {
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
