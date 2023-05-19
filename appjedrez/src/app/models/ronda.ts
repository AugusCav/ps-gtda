import { Partida } from './partida';
import { Torneo } from './torneo';

export interface Ronda {
  id: number;
  numero: number;
  descripcion: string;
  idTorneo: string;
  torneo: Torneo;
  partida: Partida[];
}
