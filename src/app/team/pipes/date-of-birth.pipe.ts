import { Pipe, PipeTransform } from '@angular/core';
import { format, parse } from 'date-fns';

@Pipe({
  name: 'dateOfBirth',
})
export class DateOfBirthPipe implements PipeTransform {
  transform(strDateOfBirth: string) {
    const dob = parse(strDateOfBirth, 'MM/dd/yyyy', new Date());
    return format(dob, 'MMM dd, yyyy');
  }
}
