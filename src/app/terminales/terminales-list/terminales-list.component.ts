import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TerminalService } from './service';
import { TipoUsuario } from '../../users/choferes/agg-chofer/agg-chofer.component';
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

  constructor(private terminalService: TerminalService, private router: Router) {}
  mostrarBoton():void{

  }
  ngOnInit(): void {
    this.terminalService.obtenerTerminales().subscribe(
      (data) => {
        this.terminales = data;
      },
      (error) => {
        console.error('Error al obtener terminales:', error);
      }
    );
  }

  verTerminal(id: number): void {
    this.router.navigate(['/terminal', id]);
  }
}
