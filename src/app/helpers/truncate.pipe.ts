import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: String, limit: number, ...args: unknown[]): unknown {
    limit = limit || 150;

    return value.substr(0, limit) + `${value.length > limit ? '...' : ''}`;
  }
}
