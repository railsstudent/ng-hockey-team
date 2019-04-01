import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { TeamActions } from '../../actions';
import { HockeyState, selectTeamErrorMessage, selectTeamMessage } from '../../reducers';

@Component({
  selector: 'app-new-team-container',
  templateUrl: './new-team-container.component.html',
  styleUrls: ['./new-team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainerComponent implements OnInit {
  @ViewChild('f')
  formDirective: NgForm;

  form: FormGroup;
  message$: Observable<string | null>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<HockeyState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      division: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    });

    this.message$ = this.store.pipe(
      select(selectTeamMessage),
      share(),
    );

    this.message$.pipe(filter(msg => !!msg)).subscribe(() => {
      this.formDirective.resetForm();
      this.form.reset();
    });

    this.error$ = this.store.pipe(select(selectTeamErrorMessage));
  }

  returnToMenu() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addTeam() {
    this.store.dispatch(new TeamActions.AddTeam(this.form.value));
  }
}
