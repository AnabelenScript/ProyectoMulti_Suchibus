import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  styleUrl: './agg-chofer.component.css'
})
export class AggChoferComponent {

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
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private choferService: ChoferService) {}

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
  
  uploadFile(file: File | null) {
    if (file) {
      console.log('Archivo seleccionado:', file);
    } else {
      console.log('No se seleccionó un archivo');
    }
  }

  registrarChofer(): void {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(this.choferData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo electrónico no es válido.',
      });
      return;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(this.choferData.telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El teléfono debe tener exactamente 10 dígitos.',
      });
      return;
    }

    if (this.choferData.password.length !== 8) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener exactamente 8 caracteres.',
      });
      return;
    }

    // Validar que todos los demás campos estén llenos
    if (!this.choferData.nombre || 
        !this.choferData.lastname || 
        !this.choferData.email || 
        !this.choferData.edad || 
        !this.choferData.telefono || 
        !this.choferData.username || 
        !this.choferData.password || 
        !this.choferData.licencia || 
        !this.choferData.status || 
        !this.choferData.direccion?.calle || 
        !this.choferData.direccion?.ciudad || 
        !this.choferData.direccion?.estado || 
        !this.choferData.direccion?.codigoPostal) {
        
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios. Por favor, complete todos los campos.',
      });
      return; // Detiene la ejecución si hay campos vacíos
    }

    // Si todas las validaciones pasaron, se prepara el formulario
    const formData = new FormData();
    formData.append('nombre', this.choferData.nombre);
    formData.append('lastname', this.choferData.lastname.toString());
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
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    
    // Realizar el registro del chofer
    this.choferService.registrarUsuario(formData).subscribe(
      (response) => {
        console.log('Chofer registrado exitosamente', response);
      },
      (error) => {
        console.error('Error al registrar el chofer', error);
        if (error.error && error.error.mensaje) {
          console.error('Mensaje del servidor:', error.error.mensaje);
        }
      }
    );
  }
}

