import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }
}
