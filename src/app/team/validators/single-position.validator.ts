import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function singlePositionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const captainValue = formGroup.get('isCaptain');
    const assistantCaptainValue = formGroup.get('isAssistantCaptain');

    return captainValue &&
      assistantCaptainValue &&
      captainValue.value === 'true' &&
      assistantCaptainValue.value === 'true'
      ? { singlePosition: true }
      : null;
  };
}
