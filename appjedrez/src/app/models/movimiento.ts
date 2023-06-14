import { Analisis } from './analisis';

export interface Movimiento {
  id: number;
  color: string;
  moveFrom: string;
  moveTo: string;
  pieza: string;
  evaluacion: number;
  bestMove: string;
  idAnalisis: number;
  idAnalisisNavigation: Analisis[];
  fen: string;
}
