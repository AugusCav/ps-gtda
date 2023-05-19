import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'partida',
})
export class PartidaPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (value == null) {
      return 'No se ha jugado';
    } else {
      return value;
    }
  }
}
