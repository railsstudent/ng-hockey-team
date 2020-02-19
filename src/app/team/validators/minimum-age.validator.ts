import { AbstractControl, ValidatorFn } from '@angular/forms';
import { differenceInYears } from 'date-fns';

export function minimumAgeValidator(minimumAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const age = differenceInYears(new Date(), value);
    return age >= 0 && age < minimumAge ? { minimumAge: age } : null;
  };
}
