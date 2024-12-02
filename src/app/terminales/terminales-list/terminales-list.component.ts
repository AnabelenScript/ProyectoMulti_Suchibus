import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminalService } from './service';
import { TipoUsuario } from '../../users/choferes/agg-chofer/agg-chofer.component';
import { AuthService } from '../../service';
import Swal from 'sweetalert2';

interface Terminal {
  id: number;
  nombre: string;
  direccion: string;
  horarioApertura: string;
  horarioCierre: string;
  telefono: string;
  administradorid: number;  
  ruta_id: string;
}

@Component({
  selector: 'app-terminales-list',
  templateUrl: './terminales-list.component.html',
  styleUrls: ['./terminales-list.component.css']
})
export class TerminalesListComponent implements OnInit {
  TipoUsuario = TipoUsuario;
  terminales: Terminal[] = [];
  showButton: boolean = false;

  constructor(
    private terminalService: TerminalService, 
    private router: Router, 
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  const role = this.authService.getRole();
  this.showButton = role === 'Administrador';

  // Obtener terminales
  this.terminalService.obtenerTerminales().subscribe(
    (data: any[]) => {
      this.terminales = data.map((terminal) => ({
        ...terminal,
        administradorid: terminal.administrador_id || null,
      })) as Terminal[];
    },
    (error) => {
      console.error('Error al obtener terminales:', error);
    }
  );
}


verTerminal(terminalId: number): void {
  const role = this.authService.getRole();
  const adminId = this.authService.getAdminId();

  if (role === 'Pasajero') {
    console.log('El rol es Pasajero, redirigiendo a unidades');
    this.router.navigate(['/unidadeslist', terminalId]);
    return;
  }

  if (!adminId) {
    console.warn('No se encontró el ID del administrador.');
    return;
  }

  console.log('adminId en verTerminal:', adminId);

  const terminal = this.terminales.find((t) => t.id === terminalId);
  if (!terminal) {
    console.warn('Terminal no encontrada.');
    return;
  }

  const terminalAdminId = terminal.administradorid;
  console.log('Comparando adminId:', adminId, 'con terminalAdminId:', terminalAdminId);

  if (role === 'Administrador') {
    console.log('role es Administrador');

    if (terminalAdminId === adminId) {
      console.log('Acceso autorizado');
      this.router.navigate(['/terminal', terminalId]);
    } else {
      console.log('No tienes permisos para acceder a esta terminal');
      
      Swal.fire({
        title: 'Advertencia',
        text: 'No tienes permisos para acceder a esta terminal',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      }).then(() => {
      });
    }
    
  } else {
    console.log('El rol no es Administrador');
    this.router.navigate(['/terminales']);
  }
}

}
