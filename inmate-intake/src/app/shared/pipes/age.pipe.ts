/* This pipe expects a DOB and outputs the personas age in years ONLY */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dobToAge'
})
export class AgePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    const now = new Date();
    const dob = new Date(value);

    return ((now.getTime() - dob.getTime()) / 31536000000).toFixed(0);
  }
}
