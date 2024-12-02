import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { UserService } from '../../users/service';
import { User } from '../../users/userModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../service';
import { ChoferService } from '../../users/choferes/service';
import { Administrador } from '../../users/userModel';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  showModal: boolean = false;
  menuOpen = false;
  showButton: boolean = false;
  canSeeAdminLink: boolean = false;
  administradorSeleccionado?: Administrador;


  selectUser: User = { id: 0, nombre: '', email: '', password: '' };

  constructor(private userService: UserService,private location: Location, private router: Router, private authservice: AuthService,private choferService: ChoferService) {}
  ngOnInit(): void {
    const role = this.authservice.getRole();
    this.showButton = role === 'Administrador';
    const adminId = this.authservice.getAdminId();
    this.canSeeAdminLink = role === 'Pasajero' && adminId === 1;
  }
  goBack(): void {
    this.location.back();
  }
  logout() {
    localStorage.removeItem('authToken');
    this.authservice.setRole(''); 
    this.router.navigate(['/']);
  }

  toggleMenu() {
   this.menuOpen = !this.menuOpen;
  }

  mostrarChoferes(): void{
    this.router.navigate(['/mostrarChoferes']);
  }
  mostrarAdministradores(): void{
    this.router.navigate(['/mostrarAdministradores'])
  }

  inicio(): void{
    this.router.navigate(['/terminales'])
  }

  verDetallesUsuario(): void {
    this.userService.obtenerUsuarioActual().subscribe(
      (data: User) => {
        this.selectUser = data;
        this.showModal = true;
      },
      (error) => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }

  cerrarModal(): void {
    this.showModal = false;
    this.selectUser = { id: 0, nombre: '', email: '', password: '' };
  }

  actualizarUsuario(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.selectUser.email)) {
      Swal.fire(
        'Error',
        'Por favor, ingresa un correo electrónico válido.',
        'error'
      );
      return;
    }
  
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(this.selectUser.nombre)) {
      Swal.fire(
        'Error',
        'El nombre de usuario solo debe contener letras.',
        'error'
      );
      return;
    }
  
    if (this.selectUser.id !== undefined) {
      this.userService.actualizarUsuarioBase(this.selectUser.id, this.selectUser).subscribe(
        () => {
          Swal.fire(
            'Actualizado!',
            'El usuario ha sido actualizado con éxito.',
            'success'
          );
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al actualizar el usuario.',
            'error'
          );
        }
      );
    }
  }
  verDetallesUsuario2(): void {
    const userId = this.authservice.getAdminId(); // Obtén el ID del usuario actual
    const userRole = this.authservice.getRole(); // Obtén el rol del usuario actual
  
    if (!userId) {
      console.error('El ID del usuario actual no está disponible.');
      return;
    }
  
    if (userRole === 'Administrador') {
      // Mostrar detalles del administrador
      this.mostrarDetallesAdministrador(userId);
    } else if (userRole === 'Pasajero') {
      this.userService.obtenerUsuarioActual().subscribe(
        (data: User) => {
          this.selectUser = data;
          this.showModal = true;
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('Rol de usuario desconocido:', userRole);
    }
  }
  mostrarDetallesAdministrador(id: number): void {
    this.choferService.obtenerUsuarioPorIdAdmin(id).subscribe((data: Administrador) => {
      if (data.direccion && typeof data.direccion === 'string') {
        try {
          data.direccion = JSON.parse(data.direccion);
        } catch (error) {
          console.error('Error al parsear la dirección:', error);
          data.direccion = undefined;
        }
      }
      this.administradorSeleccionado = data;
      this.showModal = true; // Activa el modal
    });
  }
  
  cerrarModala(): void {
    this.administradorSeleccionado = undefined; // Limpia los datos
    this.showModal = false; // Cierra el modal
  }
  
  abrirModal(administrador: any): void {
  console.log('Administrador seleccionado:', administrador);
  this.administradorSeleccionado = administrador;
}    
}
