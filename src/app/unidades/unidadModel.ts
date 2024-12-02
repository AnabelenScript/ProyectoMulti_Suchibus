import { SafeUrl } from "@angular/platform-browser";

export interface Unidad {
  id: number;
  numPlaca: string;
  modelo: string;
  marca: string;
  fecha_compra: string;
  imagen_url:string | SafeUrl;
  terminal_id: number;
  status: string;  
  imagen_archivo: string;
  num_asientos: number;
  actual_cupo: number;
  hora_salida: String;
  hora_llegada: String;
}