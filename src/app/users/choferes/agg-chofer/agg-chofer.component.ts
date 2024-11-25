import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoferService } from '../service';
import { Chofer } from '../../userModel';

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
