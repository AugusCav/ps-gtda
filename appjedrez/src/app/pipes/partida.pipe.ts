import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'partida',
})
export class PartidaPipe implements PipeTransform {
  transform(value: any, resultado: boolean): unknown {
    if (!resultado) {
      if (value == null) {
        return 'No se ha jugado';
      } else {
        return value;
      }
    } else {
      if (value == -1) {
        return 'Negras';
      }
      if (value == 1) {
        return 'Blancas';
      }
      if (value == 0) {
        return 'TABLAS';
      } else {
        return 'Ninguno';
      }
    }
  }
}
