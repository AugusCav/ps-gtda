import { Torneo } from './torneo';
import { Usuario } from './usuario';

export interface Notificacion {
  id: string;
  usuarioId: string;
  torneoId: string;
  mensaje: string;
  estado: string;
  fecha: string;
  usuario: Usuario;
  torneo: Torneo;
}
