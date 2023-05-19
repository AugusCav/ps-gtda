import { Usuario } from './usuario';

export interface RolUsuario {
  id: number;
  rol: string;
  usuarios: Usuario[];
}
