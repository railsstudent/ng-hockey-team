import { AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { PlayerService } from '../services';

export function leaderCountValidator(
  service: PlayerService,
  maxNumCaptains: number,
  maxNumAssistantCaptains: number,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const captainCtrl = formGroup.get('isCaptain');
    const assistantCaptainCtrl = formGroup.get('isAssistantCaptain');

    if (!!teamCtrl && !!captainCtrl && !!assistantCaptainCtrl) {
      const teamId = teamCtrl.value;
      const futureCaptain: number = captainCtrl.value === 'true' ? 1 : 0;
      const futureAssistantCaptain: number = assistantCaptainCtrl.value === 'true' ? 1 : 0;

      if (!!teamId) {
        const { captain, assistantCaptain } = service.findLeaderCountSummary(teamId);
        console.log('captain', captain, 'assistantCaptain', assistantCaptain);
        if (futureCaptain + captain > maxNumCaptains) {
          return Promise.resolve({
            maxNumCaptains: {
              count: maxNumCaptains,
            },
          });
        }

        if (futureAssistantCaptain + assistantCaptain > maxNumAssistantCaptains) {
          return Promise.resolve({
            maxNumACaptains: {
              count: maxNumAssistantCaptains,
            },
          });
        }
      }
    }
    return Promise.resolve(null);
  };
}
