import { Component } from '@angular/core';
import { ChoferService } from '../../choferes/service';
import { Administrador, Chofer } from '../../userModel';
import { TipoUsuario } from '../agg-administradores/agg-administradores.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-administradores',
  templateUrl: './list-administradores.component.html',
  styleUrl: './list-administradores.component.css'
})
export class ListAdministradoresComponent {
  administradores: Administrador[] = [];
  administradorSeleccionado?: Administrador;

  constructor(private choferService: ChoferService, private router:Router) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.choferService.obtenerTodosUsuariosAdmin().subscribe(
      (usuarios) => {
        this.administradores = usuarios.filter((usuario: Administrador) => usuario.tipo_usuario === TipoUsuario.Administrador);
      },
      (error) => {
        console.error('Error al cargar los Administradores:', error);
      }
    );
  }

  mostrarDetallesAdministrador(id: number): void {
    this.choferService.obtenerUsuarioPorIdAdmin(id).subscribe((data: Administrador) => {
      if (data.direccion && typeof data.direccion === 'string') {
        try {
          data.direccion = JSON.parse(data.direccion);
        } catch (error) {
          console.error('Error al parsear la dirección:', error);
          data.direccion = undefined;
        }
      }
      this.administradorSeleccionado = data;
      console.log(this.administradorSeleccionado);
    });
  }
  registrarAdministrador(): void {
    this.router.navigate(['/registrarAdministrador']);
  }
  

  cerrarModal(): void {
    this.administradorSeleccionado = undefined;
  }
}
