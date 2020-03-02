import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { differenceInYears, parse } from 'date-fns';

export function futureTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const age = differenceInYears(new Date(), parse(value, 'MM/dd/yyyy', new Date()));
    return age < 0 ? { futureTime: true } : null;
  };
}
