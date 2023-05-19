import { Ronda } from './ronda';
import { Usuario } from './usuario';

export interface Partida {
  id: string;
  jugadorBlancas: string;
  jugadorNegras: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  resultado: number;
  pgn: string;
  idRonda: number;
  idRondaNavigation: Ronda;
  jugadorBlancasNavigation: Usuario | null;
  jugadorNegrasNavigation: Usuario | null;
}
