import { Inscripcion } from './inscripcion';
import { Ronda } from './ronda';
import { TipoTorneo } from './tipo-torneo';
import { Usuario } from './usuario';

export interface Torneo {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFinal: string;
  descripcion: string;
  localidad: string;
  idTipoTorneo: number;
  cantidadParticipantes: number;
  idOrganizador: string;
  eloMinimo: number;
  eloMaximo: number;
  horaInicio: string;
  horaFinal: string;
  borrado: boolean;
  organizador: Usuario;
  tipoTorneo: TipoTorneo;
  inscripciones: Inscripcion[];
  rondas: Ronda[];
}
