import { TipoTorneo } from './tipo-torneo';

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
  tipoTorneo: TipoTorneo;
}
