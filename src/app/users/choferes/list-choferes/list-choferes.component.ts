import { Component, OnInit } from '@angular/core';
import { ChoferService } from '../service';
import { Chofer } from '../../userModel';
import { TipoUsuario } from '../agg-chofer/agg-chofer.component';
import { Router } from '@angular/router';




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

  constructor(private choferService: ChoferService, private router:Router) {}

  ngOnInit(): void {
    this.cargarChoferes();
  }

  cargarChoferes(): void {
    this.choferService.obtenerTodosUsuarios().subscribe(
      (usuarios) => {
        this.choferes = usuarios.filter((usuario: Chofer) => usuario.tipo_usuario === TipoUsuario.Chofer);
      },
      (error) => {
        console.error('Error al cargar los choferes:', error);
      }
    );
  }

  mostrarDetallesChofer(id: number): void {
    this.choferService.obtenerUsuarioPorId(id).subscribe((data: Chofer) => {
      // Validar y parsear 'direccion' si es necesario
      if (data.direccion && typeof data.direccion === 'string') {
        try {
          data.direccion = JSON.parse(data.direccion); // Convertir cadena JSON a objeto
        } catch (error) {
          console.error('Error al parsear la dirección:', error);
          data.direccion = undefined; // Si falla, aseguramos que no cause errores
        }
      }
      this.choferSeleccionado = data; // Asignar chofer seleccionado
      console.log(this.choferSeleccionado); // Verificar datos en la consola
    });
  }
  registrarChofer(): void {
    this.router.navigate(['/registrarChofer']);
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