import { Component } from '@angular/core';
import { TerminalService } from './service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregarterminal',
  templateUrl: './agregarterminal.component.html',
  styleUrl: './agregarterminal.component.css'
})
export class AgregarterminalComponent {
  terminalData: any= {
    nombre: '',
    num: '',
    municipio: '',
    colonia: '',
    calle: '',
    horarioApertura: '',
    horarioCierre: '',
    telefono: '',
    cp:'',
    estado:'',
  };

  colonias: any[] = [];
  loadingColonias= false;

  constructor(private terminalService: TerminalService) {}


  obtenerColoniasPorCP(): void {
    const cp = this.terminalData.cp;
    if (cp && cp.length === 5) { 
      this.terminalService.obtenerColoniasPorCp(cp).subscribe({
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
    this.terminalService.agregarTerminal(this.terminalData).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Terminal creada exitosamente', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear la terminal', 'error');
      }
    );
  }
}
