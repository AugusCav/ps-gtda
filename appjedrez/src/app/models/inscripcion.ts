import { Usuario } from "./usuario";

export interface Inscripcion {
  id: string;
  idTorneo: string;
  idParticipante: string;
  horaInscripcion: string;
  participante: Usuario;
}
