import { TipoUsuario } from "./choferes/agg-chofer/agg-chofer.component";
export interface Chofer {
  id?: number;
  nombre: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  licencia: string;
  telefono: string;
  experienciaLaboral: string;
  edad: string;
  direccion?: {
    calle: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };
  imagen_url?: string;
  tipo_usuario: TipoUsuario;
  status: '';
}
export interface Administrador {
  id?: number;
  nombre: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  telefono: string;
  experienciaLaboral: string;
  edad: string;
  direccion?: {
    calle: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };
  imagen_url?: string;
  tipo_usuario: TipoUsuario;
  status: '';
}
export interface User {
    id?: number;
    nombre: string;
    email: string;
    password?: string;
  }