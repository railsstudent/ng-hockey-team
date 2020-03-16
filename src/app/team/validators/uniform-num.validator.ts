import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniformNumValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const teamCtrl = formGroup.get('team');
    const uniformCtrl = formGroup.get('uniformNo');

    const invalid =
      !!teamCtrl &&
      !!uniformCtrl &&
      !!teamCtrl.value &&
      (typeof uniformCtrl.value === 'undefined' || uniformCtrl.value === null || uniformCtrl.value === '');

    if (invalid) {
      return { emptyUniformNum: true };
    }
    return null;
  };
}
