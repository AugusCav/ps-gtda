import { Usuario } from './usuario';

export interface Notificacion {
  id: string;
  usuarioId: string;
  mensaje: string;
  estado: string;
  fecha: string;
  usuario: Usuario;
}
