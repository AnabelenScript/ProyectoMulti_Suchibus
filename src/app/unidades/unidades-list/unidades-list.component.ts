import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { Unidad } from '../unidadModel';
import { UnidadService } from '../service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-unidades-list',
  templateUrl: './unidades-list.component.html',
  styleUrls: ['./unidades-list.component.css']
})
export class UnidadesListComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  unidades: Unidad[] = [];
  selectedUnidad: Unidad | null = null;
  showModal: boolean = false;
  showModalEditar:boolean = false
  terminalId: number | null = null;
  mensaje: string | null = null;

  unidad: Unidad = {
    id: 0,
    numPlaca: '',
    modelo: '',
    marca: '',
    fecha_compra: '',
    terminal_id: 0,
    imagen_url: '',
    status: 'activo'  ,
    imagen_archivo: ''
  };

  constructor(
    private unidadService: UnidadService,
    private route: ActivatedRoute,
    private router: Router ,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.terminalId = Number(params.get('terminalId'));

      if (this.terminalId) {
        this.cargarUnidades();
      } else {
        console.warn('No se encontró el terminalId en la URL');
      }
    });
  }

  cargarUnidades(): void {
    if (this.terminalId !== null) {
      this.unidadService.obtenerUnidadesPorTerminal(this.terminalId).subscribe(
        (data: Unidad[]) => {
          this.unidades = [];
          data.forEach((unidad) => {
            this.unidades.push(unidad);
            if (unidad.imagen_url) {
              this.unidadService.downloadImage(unidad.imagen_url).subscribe(
                (blob: Blob) => {
                  if (blob.size > 0) {
                    const imageUrl = URL.createObjectURL(blob);
                    unidad.imagen_url = imageUrl; 
                  } else {
                    console.warn(`El blob para la unidad ${unidad.id} está vacío.`);
                  }
                },
                (error) => {
                  console.error(`Error al descargar la imagen para la unidad ${unidad.id}:`, error);
                }
              );
            }
          });
  
          console.log('Unidades recibidas:', this.unidades);
          this.mensaje = data.length ? null : 'No hay unidades para esta terminal.';
        },
        (error) => {
          console.error('Error al cargar las unidades:', error);
          this.mensaje = 'No hay unidades para esta terminal.';
        }
      );
    } else {
      console.warn('No se pudo cargar las unidades: terminalId es null');
    }
  }
  
  abrirModal(): void {
    this.showModal = true;
  }

  abrirModalEditar(): void {
    this.showModalEditar = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.showModalEditar = false
    this.unidad = {
      id: 0,
      numPlaca: '',
      modelo: '',
      marca: '',
      fecha_compra: '',
      imagen_url: '',
      terminal_id: this.terminalId || 0,
      status: 'activo' ,
      imagen_archivo: ''
    };
  }
  verUnidadDetalle(id: number): void {
    this.unidadService.obtenerUnidad(id).subscribe((data: Unidad) => {
      this.showModalEditar = true;
      this.selectedUnidad = data;
      this.unidad = this.selectedUnidad;
      if (this.unidad.imagen_url) {
        this.unidadService.downloadImage(this.unidad.imagen_url).subscribe((blob: Blob) => {
          const imageUrl = URL.createObjectURL(blob);
          this.unidad.imagen_url = imageUrl;
        });
      }
    });
  }
  
  agregarUnidad(): void {
    if (this.unidad.numPlaca && this.unidad.modelo && this.unidad.marca && this.unidad.fecha_compra) {
      this.unidad.terminal_id = this.terminalId || 0;
      if (this.fileInput && this.fileInput.nativeElement.files.length > 0) {
        const archivoSeleccionado = this.fileInput.nativeElement.files[0];
        console.log(archivoSeleccionado);
        const unidadData = {
          numPlaca: this.unidad.numPlaca,
          status: this.unidad.status,
          modelo: this.unidad.modelo,
          marca: this.unidad.marca,
          fecha_compra: this.unidad.fecha_compra,
          terminal_id: this.unidad.terminal_id
        };
        this.unidadService.crearUnidad(unidadData, archivoSeleccionado).subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Unidad y imagen agregadas correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.cerrarModal();
            });
          },
          (error) => {
            console.error('Error al agregar unidad:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo agregar la unidad. Intenta de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Por favor selecciona un archivo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }
  
  editarUnidad(): void {
    if (this.selectedUnidad) { 
      this.unidadService.actualizarUnidad(this.selectedUnidad.id, this.unidad).subscribe(
        (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Unidad editada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.cargarUnidades();  
            this.cerrarModal(); 
          });
        },
        (error: any) => { 
          console.error('Error al editar la unidad:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo editar la unidad. Intenta de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
  
  eliminarUnidad(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar la unidad con placa ${this.selectedUnidad?.numPlaca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadService.eliminarUnidad(this.selectedUnidad!.id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: 'Unidad eliminada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.cargarUnidades();  
              this.cerrarModal(); 
            });
          },
          (error: any) => { 
            console.error('Error al eliminar la unidad:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la unidad. Intenta de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
  }
  
}