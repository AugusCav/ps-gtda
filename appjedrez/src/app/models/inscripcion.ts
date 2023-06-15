import { Torneo } from './torneo';
import { Usuario } from './usuario';

export interface Inscripcion {
  id: string;
  idTorneo: string;
  idParticipante: string;
  horaInscripcion: string;
  fecha: string;
  estado: string;
  participante: Usuario;
  torneo: Torneo;
}
