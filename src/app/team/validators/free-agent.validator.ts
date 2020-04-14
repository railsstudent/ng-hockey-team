import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function freeAgentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const uniformCtrl = formGroup.get('uniformNo');
    const captainCtrl = formGroup.get('isCaptain');
    const assistantCaptainCtrl = formGroup.get('isAssistantCaptain');

    if (teamCtrl && uniformCtrl && captainCtrl && assistantCaptainCtrl) {
      const uniformValue = uniformCtrl.value;
      const teamValue = teamCtrl.value;
      const captainValue = captainCtrl.value === 'true';
      const assistantCaptainValue = assistantCaptainCtrl.value === 'true';

      if (!!uniformValue && !teamValue) {
        return { freeAgent: true };
      }

      if (!uniformValue && !teamValue && captainValue) {
        return { freeAgentCaptain: true };
      }

      if (!uniformValue && !teamValue && assistantCaptainValue) {
        return { freeAgentAssistantCaptain: true };
      }
    }
    return null;
  };
}
