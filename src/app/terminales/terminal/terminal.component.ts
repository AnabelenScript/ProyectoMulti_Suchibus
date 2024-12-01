import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service';
import { TerminalService } from '../terminales-list/service';
import { TerminalServiceagg } from '../agregarterminal/service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
})
export class TerminalComponent implements OnInit {
  terminal: any = {
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
  };
  modalVisible: boolean = false;
  terminalId: number | null = null;
  colonias: any[] = [];
  loadingColonias = false;
  showButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private terminalService: TerminalService,
    private authservice: AuthService,
    private terminalServiceagg: TerminalServiceagg
  ) {}

  ngOnInit(): void {
    const role = this.authservice.getRole();
    this.showButton = role === 'Administrador';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.terminalId = +id;
      this.terminalService.obtenerTerminalPorId(this.terminalId).subscribe(
        (data) => {
          this.terminal = data;
          console.log(this.terminal);
        },
        (error) => {
          console.error('Error al obtener terminal:', error);
        }
      );
    }
  }

  obtenerColoniasPorCP(): void {
    const cp = this.terminal.direccion.cp;
    if (cp && cp.length === 5) {
      this.loadingColonias = true;
      this.terminalServiceagg.obtenerColoniasPorCp(cp).subscribe({
        next: (response) => {
          console.log('Datos obtenidos por CP:', response);
          if (response) {
            this.colonias = response.colonias || [];
            this.terminal.direccion.estado = response.estado || '';
            this.terminal.direccion.municipio = response.municipio || '';
          } else {
            this.colonias = [];
            this.terminal.direccion.estado = '';
            this.terminal.direccion.municipio = '';
          }
        },
        error: (err) => {
          console.error('Error al obtener datos por CP:', err);
          this.colonias = [];
          this.terminal.direccion.estado = '';
          this.terminal.direccion.municipio = '';
        },
        complete: () => {
          this.loadingColonias = false;
        },
      });
    } else {
      this.colonias = [];
      this.terminal.direccion.estado = '';
      this.terminal.direccion.municipio = '';
    }
  }
  

  abrirModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  guardarCambios() {
    // Validación de los campos
    if (!this.terminal.nombre || !this.terminal.direccion.num || !this.terminal.direccion.cp || 
        !this.terminal.direccion.colonia || !this.terminal.direccion.estado || !this.terminal.direccion.calle || 
        !this.terminal.telefono || !this.terminal.horarioApertura || !this.terminal.horarioCierre || 
        !this.terminal.direccion.municipio) {
      // Si algún campo está vacío, muestra una alerta de advertencia
      Swal.fire('Error', 'Por favor, completa todos los campos obligatorios.', 'warning');
      return; // No continua con la ejecución de guardarCambios
    }
  
    // Si todos los campos son válidos, proceder con la actualización
    if (this.terminalId !== null) {
      console.log('Datos a actualizar:', this.terminal);
  
      this.terminalService.actualizarTerminal(this.terminalId, this.terminal).subscribe(
        () => {
          console.log('Terminal actualizada correctamente');
          Swal.fire('Éxito', 'Los cambios se han guardado correctamente', 'success');
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar terminal:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar la terminal', 'error');
        }
      );
    }
  }
  

  eliminarTerminal() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed && this.terminalId !== null) {
        this.terminalService.eliminarTerminal(this.terminalId).subscribe(
          () => {
            Swal.fire('Eliminada', 'La terminal ha sido eliminada.', 'success');
          },
          (error) => {
            console.error('Error al eliminar terminal:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la terminal.', 'error');
          }
        );
      }
    });
  }
}
