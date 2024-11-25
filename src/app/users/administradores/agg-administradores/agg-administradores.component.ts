import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoferService } from '../../choferes/service';
import { Administrador } from '../../userModel';
 export enum TipoUsuario {
  Chofer = 'Chofer',
  Administrador = 'Administrador',
  Pasajero = 'Pasajero'
}
@Component({
  selector: 'app-agg-administradores',
  templateUrl: './agg-administradores.component.html',
  styleUrl: './agg-administradores.component.css'
})
export class AggAdministradoresComponent {

  administradorData: Administrador = {
    nombre: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
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
    tipo_usuario: TipoUsuario.Administrador,
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

  registrarAdministrador(): void {
    const formData = new FormData();
    
    formData.append('nombre', this.administradorData.nombre);
    formData.append('lastname', this.administradorData.lastname.toString());
    formData.append('email', this.administradorData.email);
    formData.append('edad', this.administradorData.edad.toString());
    formData.append('telefono', this.administradorData.telefono);
    formData.append('experienciaLaboral', this.administradorData.experienciaLaboral);
    formData.append('username', this.administradorData.username);
    formData.append('password', this.administradorData.password);
    formData.append('status', this.administradorData.status);
    formData.append('direccion', JSON.stringify(this.administradorData.direccion));
    
    formData.append('tipo_usuario', TipoUsuario.Administrador);
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    
    this.choferService.registrarUsuario(formData).subscribe(
      (response) => {
        console.log('Administrador registrado exitosamente', response);
      },
      (error) => {
        console.error('Error al registrar el Administrador', error);
        if (error.error && error.error.mensaje) {
          console.error('Mensaje del servidor:', error.error.mensaje);
        }
      }
    );
  }
}
