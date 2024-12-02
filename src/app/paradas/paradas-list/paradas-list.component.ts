import { Parada } from './../paradaModel';
import { PuntosParadaService } from './../service';
import { RutaService } from './../../rutas/service';
import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../../terminales/terminales-list/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paradas-list',
  templateUrl: './paradas-list.component.html',
  styleUrls: ['./paradas-list.component.css']
})
export class ParadasListComponent implements OnInit {
  paradas: Parada[] = [];
  selectedParadaUrl: string | null = null;
  selectedParada: Parada | null = null;
  terminalId: number | null = null;
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
    ruta_id: ''
  };

  constructor(
    private terminalService: TerminalService,
    private puntosParadaService: PuntosParadaService,
    private route: ActivatedRoute,
    private router: Router,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.terminalId = Number(params.get('terminalId'));
      if (this.terminalId) {
        this.terminalService.obtenerTerminalPorId(this.terminalId).subscribe(
          (data) => {
            this.terminal = data;
            if (this.terminal.ruta_id) {
              this.cargarRutaById(this.terminal.ruta_id);
            }
          },
          (error) => {
            console.error('Error al obtener la terminal:', error);
          }
        );
      }
    });
  }

  cargarRutaById(id: string): void {
    this.puntosParadaService.getParadaByIdRuta(id).subscribe(
      (data) => {
        this.paradas = data;
        console.log('Paradas para la ruta obtenidas:', this.paradas);
      },
      (error) => {
        console.error('Error al obtener las paradas por ruta:', error);
      }
    );
  }

  verUnidadDetalle(id: string): void {
    const paradaSeleccionada = this.paradas.find((parada) => parada._id === id);
    if (paradaSeleccionada) {
      this.selectedParada = paradaSeleccionada; // Guarda la parada seleccionada
      this.selectedParadaUrl = paradaSeleccionada.puntoParadaURL || null; // URL para el iframe
      this.abrirModal();
    }
  }

  abrirModal(): void {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(): void {
    this.selectedParadaUrl = null;
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
