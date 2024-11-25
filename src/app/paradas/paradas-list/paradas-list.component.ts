import { Component, OnInit } from '@angular/core';
import { PuntosParadaService} from '../service';
import { Parada } from '../paradaModel';

@Component({
  selector: 'app-paradas-list',
  templateUrl: './paradas-list.component.html',
  styleUrls: ['./paradas-list.component.css']
})
export class ParadasListComponent implements OnInit {
  paradas: Parada[] = [];
  selectedParadaUrl: string | null = null;

  constructor(private puntosParadaService: PuntosParadaService) {}

  ngOnInit(): void {
    this.obtenerParadas();
  }
  obtenerParadas(): void {
    this.puntosParadaService.getPuntosParada().subscribe(
      (data) => {
        this.paradas = data;
      },
      (error) => {
        console.error('Error al obtener las paradas:', error);
      }
    );
  }
  verUnidadDetalle(id: string): void {
    const paradaSeleccionada = this.paradas.find((parada) => parada._id === id);
    if (paradaSeleccionada) {
      this.selectedParadaUrl = paradaSeleccionada.puntoParadaURL || null;
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
