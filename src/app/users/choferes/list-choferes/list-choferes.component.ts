import { Component, OnInit } from '@angular/core';
import { ChoferService } from '../service';
import { Chofer } from '../../userModel';
import { TipoUsuario } from '../agg-chofer/agg-chofer.component';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-list-choferes',
  templateUrl: './list-choferes.component.html',
  styleUrls: ['./list-choferes.component.css']
})
export class ListChoferesComponent implements OnInit {
  choferes: any[] = [];
  unidades: any[] = [];
  choferSeleccionado: any = null;
  unidadSeleccionada: any = null;
  terminalId: number | null = null;


  constructor(private choferService: ChoferService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.terminalId = Number(params.get('terminalId'))

      if(this.terminalId){
        this.cargarChoferes();
      }else{
        console.warn('No se encontro el terminalid en la url')
      }
    })
    

  }

  cargarChoferes(): void{
    if(this.terminalId !== null){
      this.choferService.obtenerChoferesPorTermminal(this.terminalId).subscribe(
        (response)=>{
          this.choferes = response;
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }

  mostrarDetallesChofer(id: number): void {
    this.choferService.obtenerUsuarioPorId(id).subscribe((data: Chofer) => {
      if (data.direccion && typeof data.direccion === 'string') {
        try {
          data.direccion = JSON.parse(data.direccion);
        } catch (error) {
          console.error('Error al parsear la dirección:', error);
          data.direccion = undefined;
        }
      }
      this.choferSeleccionado = data;
      console.log(this.choferSeleccionado);
    });
  }
  registrarChofer(): void {
    this.router.navigate([`/registrarChofer/${this.terminalId}`]);
  }
  asignarUnidad() {
    if (this.choferSeleccionado && this.unidadSeleccionada) {
      this.choferService
        .asignarUnidad(this.choferSeleccionado.id, this.unidadSeleccionada.id)
        .subscribe(
          (response) => {
            alert('Unidad asignada correctamente');
          },
          (error) => {
            console.error(error);
            alert('Error al asignar unidad');
          }
        );
    }
  }

  cerrarModal(): void {
    this.choferSeleccionado = undefined;
  }
}