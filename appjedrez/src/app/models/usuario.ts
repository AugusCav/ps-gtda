import { Inscripcion } from './inscripcion';
import { Partida } from './partida';
import { RolUsuario } from './rol-usuario';
import { Torneo } from './torneo';

export interface Usuario {
  id: string;
  nombreUsuario: string;
  clave: string;
  nombres: string;
  apellido: string;
  email: string;
  telefono: string;
  idRolUsuario: number;
  token: string;
  elo: number;
  rolUsuario: RolUsuario;
  inscripciones: Inscripcion[];
  notificaciones: Notification[];
  partidasJugadorBlancas: Partida[];
  partidasJugadorNegras: Partida[];
  torneos: Torneo[];
}
