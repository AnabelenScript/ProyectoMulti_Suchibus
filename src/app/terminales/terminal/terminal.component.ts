import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminalService } from '../terminales-list/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
})
export class TerminalComponent implements OnInit {
  terminal: any = {};
  modalVisible: boolean = false;
  terminalId: number | null = null; 

  constructor(
    private route: ActivatedRoute,
    private terminalService: TerminalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.terminalId = +id;
      this.terminalService.obtenerTerminalPorId(this.terminalId).subscribe(
        (data) => {
          this.terminal = data;
        },
        (error) => {
          console.error('Error al obtener terminal:', error);
        }
      );
    }
  }

  abrirModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
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
              'success'
            );
            // Aquí podrías redirigir al usuario a otra página
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
}
