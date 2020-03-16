import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function freeAgentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const uniformCtrl = formGroup.get('uniformNo');

    const invalid =
      !!teamCtrl &&
      !!uniformCtrl &&
      !!uniformCtrl.value &&
      (typeof teamCtrl.value === 'undefined' || teamCtrl.value === null || teamCtrl.value === '');

    if (invalid) {
      return { freeAgent: true };
    }
    return null;
  };
}
