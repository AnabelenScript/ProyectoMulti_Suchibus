import { Component, OnInit } from '@angular/core';
import { TerminalService2 } from './service';
import { Ruta } from '../../rutas/rutasModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarterminal',
  templateUrl: './agregarterminal.component.html',
  styleUrl: './agregarterminal.component.css'
})
export class AgregarterminalComponent implements OnInit {
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
    ruta_id: ''
  };

  colonias: any[] = [];
  rutas: Ruta[] = []; 
  loadingColonias = false;

  constructor(private terminalService2: TerminalService2) {}

  ngOnInit(): void {
    this.cargarRutas(); 
  }

  obtenerColoniasPorCP(): void {
    const cp = this.terminalData.cp;
    if (cp && cp.length === 5) {
      this.terminalService2.obtenerColoniasPorCp(cp).subscribe({
        next: (response) => {
          console.log('Respuesta de colonias:', response);
          if (response && response.colonias) {
            this.colonias = response.colonias;
          } else {
            this.colonias = [];
          }
        },
        error: (err) => {
          console.error('Error al obtener las colonias:', err);
          this.colonias = [];
        }
      });
    } else {
      this.colonias = [];
    }
  }

  agregarTerminal() {
    this.terminalService2.agregarTerminal(this.terminalData).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Terminal creada exitosamente', 'success');
      },
      (error) => {
        console.log(this.terminalData)
        Swal.fire('Error', 'Hubo un problema al crear la terminal', 'error');
      }
    );
  }
  cargarRutas(): void {
    this.terminalService2.obtenerRutas().subscribe({
      next: (response: Ruta[]) => {
        console.log('Rutas obtenidas:', response);
        this.rutas = response;
      },
      error: (err) => {
        console.error('Error al obtener rutas:', err);
        Swal.fire('Error', 'No se pudieron cargar las rutas', 'error');
      }
    });
  }

  cargarRutaByid(id: number): void{
    this.terminalService2.obtenerRutasById(this.terminalData.ruta_id).subscribe(
    )
  }
}
