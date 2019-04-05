import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { TeamWithPoints } from '../models';
import { HockeyState, selectOneTeam } from '../reducers';

@Component({
  templateUrl: './team-roster.container.html',
  styleUrls: ['./team-roster.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRosterContainer implements OnInit, OnDestroy {
  team$: Observable<TeamWithPoints | undefined>;
  unsubscribe$ = new Subject();

  constructor(private store: Store<HockeyState>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const teamId = this.route.snapshot.params.teamId;
    this.team$ = this.store.pipe(select(selectOneTeam));

    this.team$
      .pipe(
        map(team => {
          if (!team) {
            return this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
          }
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  returnToMenu() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
