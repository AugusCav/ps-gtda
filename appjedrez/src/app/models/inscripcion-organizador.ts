import { Torneo } from './torneo';
import { Usuario } from './usuario';

export interface InscripcionOrganizador {
  id: number;
  idUsuario: string;
  fechaPedido: string;
  estadoPedido: string;
  idUsuarioNavigation: Usuario;
}
