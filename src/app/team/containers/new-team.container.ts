import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TeamActions } from '../actions';
import { LeagueState } from '../reducers';
import { getTeamErrorMessage, getTeamMessage } from '../selectors';

@Component({
  templateUrl: './new-team.container.html',
  styleUrls: ['./new-team.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainer implements OnInit {
  @ViewChild('f')
  formDirective: NgForm;

  form: FormGroup;
  message$: Observable<string | null>;

  error$ = this.store.pipe(select(getTeamErrorMessage));

  constructor(private store: Store<LeagueState>, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      division: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    });

    this.message$ = this.store.pipe(
      select(getTeamMessage),
      tap(msg => {
        if (msg) {
          this.formDirective.resetForm();
          this.form.reset();
        }
      }),
    );
  }

  returnToMenu() {
    this.router.navigate(['/team']);
  }

  addTeam() {
    this.store.dispatch(new TeamActions.AddTeam(this.form.value));
  }
}
