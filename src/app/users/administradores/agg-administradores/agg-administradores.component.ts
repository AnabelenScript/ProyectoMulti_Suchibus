import { Component } from '@angular/core';
import { ChoferService } from '../../choferes/service';
import { Administrador } from '../../userModel';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export enum TipoUsuario {
  Chofer = 'Chofer',
  Administrador = 'Administrador',
  Pasajero = 'Pasajero'
}

@Component({
  selector: 'app-agg-administradores',
  templateUrl: './agg-administradores.component.html',
  styleUrls: ['./agg-administradores.component.css']
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

  registrarAdministrador(): void {
    // Validación de campos vacíos
    if (!this.administradorData.nombre || !this.administradorData.lastname || 
        !this.administradorData.email || !this.administradorData.password || 
        !this.administradorData.username || !this.administradorData.telefono || 
        !this.administradorData.edad || !this.administradorData.status || 
        !this.administradorData.direccion?.calle || !this.administradorData.direccion?.ciudad || 
        !this.administradorData.direccion?.estado || !this.administradorData.direccion?.codigoPostal) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    // Validaciones de los campos
    if (!this.isValidEmail(this.administradorData.email)) {
      Swal.fire('Error', 'El correo electrónico no es válido.', 'error');
      return;
    }

    if (!this.isValidPhone(this.administradorData.telefono)) {
      Swal.fire('Error', 'El teléfono debe tener 10 dígitos.', 'error');
      return;
    }

    if (!this.isValidPassword(this.administradorData.password)) {
      Swal.fire('Error', 'La contraseña debe tener exactamente 8 caracteres.', 'error');
      return;
    }

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
        Swal.fire('Éxito', 'Administrador registrado exitosamente', 'success');
        console.log('Administrador registrado exitosamente', response);
      },
      (error) => {
        Swal.fire('Error', 'Error al registrar el Administrador. Intente nuevamente.', 'error');
        console.error('Error al registrar el Administrador', error);
      }
    );
  }

  // Método de validación para el email
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Método de validación para el teléfono
  isValidPhone(phone: string): boolean {
    return phone.length === 10;
  }

  // Método de validación para la contraseña
  isValidPassword(password: string): boolean {
    return password.length === 8;
  }
}
