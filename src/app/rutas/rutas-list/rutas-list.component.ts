import { RutaService } from '../service';
import { Component } from '@angular/core';
import { Ruta } from '../rutasModel';

@Component({
  selector: 'app-rutas-list',
  templateUrl: './rutas-list.component.html',
  styleUrl: './rutas-list.component.css'
})
export class RutasListComponent {

  terminalData: any = {
    nombre: '',
    num: '',
    municipio: '',
    colonia: '',
    calle: '',
    horarioApertura: '',
    horarioCierre: '',
    telefono: '',
    cp: '',
    estado: '',
    administradorid: null,
     ruta_id: ''
  };

  constructor(
   private RutaService: RutaService
  ){

  }

  cargarRutaByid(id: number): void{
    this.RutaService.obtenerRutasById(this.terminalData.ruta_id).subscribe(
    )
  }
}
