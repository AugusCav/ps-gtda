import { Partida } from './partida';

export interface Analisis {
  id: number;
  partida: string;
  fecha: string;
  partidaNavigation: Partida;
}
