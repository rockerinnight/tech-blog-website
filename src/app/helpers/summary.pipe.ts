import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  transform(value: String, limit: number, ...args: unknown[]): unknown {
    limit = limit || 50;

    return value.substr(0, limit) + '...';
  }
}
