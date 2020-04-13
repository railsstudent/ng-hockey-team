import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { PlayerService } from '../services';

export function distinctUniformNumValidator(service: PlayerService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const uniformCtrl = formGroup.get('uniformNo');
    const playerIdCtrl = formGroup.get('id');

    if (!!teamCtrl && !!uniformCtrl) {
      const uniformNum = uniformCtrl.value;
      const teamId = teamCtrl.value;
      const playerId = (playerIdCtrl && playerIdCtrl.value) || '';

      if (!!uniformNum && !!teamId) {
        const existingPlayer = service.searchUniformNumInTeam(teamId, uniformNum);
        if (existingPlayer && (!playerId || existingPlayer.id !== playerId)) {
          return Promise.resolve({
            uniformNumTaken: existingPlayer.name,
          });
        }
      }
    }
    return Promise.resolve(null);
  };
}
