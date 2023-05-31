import { Movimiento } from './movimiento';
import { Partida } from './partida';

export interface Analisis {
  id: number;
  idPartida: string | null;
  promedioEvaluacion: number;
  idPartidaNavigation: Partida;
  movimientos: Movimiento[];
}
