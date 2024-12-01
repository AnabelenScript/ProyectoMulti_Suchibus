import { Unidad } from './../unidadModel';
import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { UnidadService } from '../service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../service';
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
  showButton: boolean = false;



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
    private router: Router,
    private domSanitizer: DomSanitizer,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.showButton = role === 'Administrador';
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
        (response) => {
          this.unidades = response;
          this.asociarImagenes();
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  asociarImagenes(): void {
    this.unidades.forEach((unidad,index) => {
      this.unidadService.downloadImage(unidad.imagen_url).subscribe(
        (response) => {
          const img = URL.createObjectURL(response);
          this.unidades[index].imagen_url = this.domSanitizer.bypassSecurityTrustUrl(img);
        },
        (err) => {
          console.log(err)
        }
      )
    })
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
      text: '¿Seguro que deseas eliminar la unidad con placa ${this.selectedUnidad?.numPlaca}?',
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
  } }