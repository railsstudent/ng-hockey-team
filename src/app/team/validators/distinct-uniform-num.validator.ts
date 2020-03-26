import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { PlayerService } from '../services';

export function distinctUniformNumValidator(service: PlayerService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const uniformCtrl = formGroup.get('uniformNo');

    if (!!teamCtrl && !!uniformCtrl) {
      const uniformNum = uniformCtrl.value;
      const teamId = teamCtrl.value;

      if (!!uniformNum && !!teamId) {
        const player = service.searchUniformNumInTeam(teamId, uniformNum);
        return Promise.resolve(
          player
            ? {
                uniformNumTaken: player.name,
              }
            : null,
        );
      }
    }
    return Promise.resolve(null);
  };
}
