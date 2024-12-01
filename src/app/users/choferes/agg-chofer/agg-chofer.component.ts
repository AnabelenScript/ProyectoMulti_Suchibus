import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoferService } from '../service';
import { Chofer } from '../../userModel';
import Swal from 'sweetalert2';

export enum TipoUsuario {
  Chofer = 'Chofer',
  Administrador = 'Administrador',
  Pasajero = 'Pasajero'
}

@Component({
  selector: 'app-agg-chofer',
  templateUrl: './agg-chofer.component.html',
  styleUrls: ['./agg-chofer.component.css']
})
export class AggChoferComponent implements OnInit {
  choferData: Chofer = {
    nombre: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
    licencia: '',
    telefono: '',
    experienciaLaboral: '',
    edad: '',
    direccion: {
      calle: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
    },
    imagen_url: '',
    tipo_usuario: TipoUsuario.Chofer,
    status: '',
    terminal_id: 0,
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  terminalId: number | null = null; 
  choferes: any[] = [];

  constructor(
    private choferService: ChoferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.terminalId = Number(params.get('terminalId')); 
      console.log('Terminal ID recibido:', this.terminalId);
      if (this.terminalId) {
        this.choferData.terminal_id = this.terminalId;
      } else {
        console.warn('No se encontró el terminalId en la URL');
      }
    });
  }
  

  cargarChoferes(): void{
    if(this.terminalId !== null){
      this.choferService.obtenerChoferesPorTermminal(this.terminalId).subscribe(
        (response)=>{
          this.choferes = response;
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files[0] ? input.files[0] : null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imagePreview = null;
    }
  }

  registrarChofer(): void {
    if (this.terminalId) {
      this.router.navigate(['/registrarChofer', this.terminalId]); 
    } else {
      this.router.navigate(['/registrarChofer']); 
    }
    if (!this.validarDatos()) return;

    const formData = new FormData();
    formData.append('nombre', this.choferData.nombre);
    formData.append('lastname', this.choferData.lastname);
    formData.append('email', this.choferData.email);
    formData.append('edad', this.choferData.edad.toString());
    formData.append('telefono', this.choferData.telefono);
    formData.append('experienciaLaboral', this.choferData.experienciaLaboral);
    formData.append('username', this.choferData.username);
    formData.append('password', this.choferData.password);
    formData.append('licencia', this.choferData.licencia);
    formData.append('status', this.choferData.status);
    formData.append('direccion', JSON.stringify(this.choferData.direccion));
    formData.append('tipo_usuario', TipoUsuario.Chofer);
    formData.append('terminal_id', this.choferData.terminal_id.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Realizar el registro del chofer
    this.choferService.registrarUsuario(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Chofer registrado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      (error) => {
        console.error('Error al registrar el chofer', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el chofer. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  validarDatos(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(this.choferData.email)) {
      Swal.fire('Error', 'El correo electrónico no es válido.', 'error');
      return false;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(this.choferData.telefono)) {
      Swal.fire('Error', 'El teléfono debe tener exactamente 10 dígitos.', 'error');
      return false;
    }

    if (this.choferData.password.length !== 8) {
      Swal.fire('Error', 'La contraseña debe tener exactamente 8 caracteres.', 'error');
      return false;
    }

    return true;
  }
}
