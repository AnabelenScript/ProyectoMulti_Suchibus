import { Component } from '@angular/core';
import { TerminalService } from './service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarterminal',
  templateUrl: './agregarterminal.component.html',
  styleUrl: './agregarterminal.component.css'
})
export class AgregarterminalComponent {
  terminalData = {
    nombre: '',
    ciudad: '',
    colonia: '',
    calle: '',
    num: '',
    horarioApertura: '',
    horarioCierre: '',
    telefono: ''
  };

  constructor(private terminalService: TerminalService) {}

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
