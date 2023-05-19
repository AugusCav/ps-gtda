import { Torneo } from './torneo';

export interface TipoTorneo {
  id: number;
  nombre: string;
  descripcion: string;
  torneos: Torneo[];
}
