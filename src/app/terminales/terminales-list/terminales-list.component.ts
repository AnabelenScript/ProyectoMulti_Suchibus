import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TerminalService } from './service';
import { TipoUsuario } from '../../users/choferes/agg-chofer/agg-chofer.component';
import { AuthService } from '../../service';
interface Terminal {
  id: number;
  nombre: string;
  direccion: string;
  horarioApertura: string;
  horarioCierre: string;
  telefono: string;
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

  constructor(private terminalService: TerminalService, private router: Router,public authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.showButton = role === 'Administrador';

    this.terminalService.obtenerTerminales().subscribe(
      (data) => {
        this.terminales = data;
      },
      (error) => {
        console.error('Error al obtener terminales:', error);
      }
    );
  }
  

//  verTerminal(id: number): void {
 //   this.router.navigate(['/terminal', id]);
 // }


 verTerminal(terminalId: number): void {
  const role = this.authService.getRole();

  if (role === 'Administrador') {
    this.router.navigate(['/terminal', terminalId]);
  } else if (role === 'Pasajero') {
    this.router.navigate(['/unidadeslist', terminalId]);
  } else {
    console.warn('Rol desconocido, no se puede redirigir.');
  }
}

}


