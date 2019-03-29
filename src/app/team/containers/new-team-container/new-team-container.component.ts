import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TeamState } from '../../reducers';

@Component({
  selector: 'app-new-team-container',
  templateUrl: './new-team-container.component.html',
  styleUrls: ['./new-team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamContainerComponent implements OnInit {
  form: FormGroup;

  constructor(
    private store: Store<TeamState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required, { updateOn: 'blur' }],
      division: [null, Validators.required, { updateOn: 'blur' }],
    });
  }

  returnToMenu() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addTeam() {
    console.log('Add team submitted');
  }
}
