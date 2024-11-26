
import { TerminalService2 } from './../agregarterminal/service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminalService } from '../terminales-list/service';
import { Router } from '@angular/router';  // Importa Router

import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
})
export class TerminalComponent implements OnInit {
  terminal: any = {};
  modalVisible: boolean = false;  // Modal de edición
  modalRutaVisible: boolean = false;  // Modal de ruta
  terminalId: number | null = null;
  rutaSeleccionada: any = null;
  selectedRutaUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private terminalService: TerminalService,
    private terminalService2: TerminalService2,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  // Modal de Edición
  abrirModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  // Modal de Ruta
  abrirModalRuta() {
    this.modalRutaVisible = true;
  }

  cerrarModalRuta() {
    this.modalRutaVisible = false;
  }

  guardarCambios() {
    if (this.terminalId !== null) {
      this.terminalService.actualizarTerminal(this.terminalId, this.terminal).subscribe(
        () => {
          console.log('Terminal actualizada correctamente');
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar terminal:', error);
        }
      );
    }
  }

  eliminarTerminal() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed && this.terminalId !== null) {
        this.terminalService.eliminarTerminal(this.terminalId).subscribe(
          () => {
            Swal.fire(
              'Eliminada',
              'La terminal ha sido eliminada.',
              'success',
            );
          },
          (error) => {
            console.error('Error al eliminar terminal:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la terminal.',
              'error'
            );
          }
        );
      }
    });
  }

  verRuta(id_ruta: string): void {
    if (id_ruta) {
      this.terminalService2.obtenerRutasById(id_ruta).subscribe({
        next: (ruta) => {
          this.rutaSeleccionada = ruta;
          this.selectedRutaUrl = this.rutaSeleccionada.mapaRutaUrl; 
          this.abrirModalRuta(); 
        },
        error: (err) => {
          console.error('Error al obtener la ruta:', err);
          Swal.fire('Error', 'No se pudo cargar la ruta', 'error');
        }
      });
    } else {
      Swal.fire('Advertencia', 'Por favor, selecciona una ruta', 'warning');
    }
  }
  verParadaById(ruta_id: string): void {
    if (ruta_id) {
      // Redirigir a la página de la parada, pasando el ruta_id como parámetro en la URL
      this.router.navigate(['/paradas', ruta_id]);  // Redirigir a la ruta de parada con el ruta_id
    } else {
      // Si el id de ruta no es válido, mostrar advertencia
      Swal.fire('Advertencia', 'Por favor, selecciona una ruta', 'warning');
    }
  }
}
  
