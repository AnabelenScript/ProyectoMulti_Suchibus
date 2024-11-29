import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service';
import { Router } from '@angular/router';
import { AuthService } from '../../service';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering = false;
  mensaje: string | null = null;
  rol: string= '';
  constructor(private fb: FormBuilder, private loginService: LoginService, private router:Router,private authService: AuthService) {

    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.loginUsuario(this.loginForm.value).subscribe({
        next: (response) => {
          this.mensaje = 'Inicio de sesión exitoso';
          console.log('Token:', response.token);
          this.authService.setRole(response.role_enum);
          this.authService.setAdminId(response.iduser);
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/terminales']);
        },
        error: (err) => {
          this.mensaje = err.error.mensaje || 'Error al iniciar sesión';
          console.error(err);
        },
      });
    } else {
      this.mensaje = 'Por favor, complete todos los campos';
    }
  }


  registrar() {
    if (this.registerForm.valid) {
      this.loginService.crearUsuarioBase(this.registerForm.value).subscribe({
        next: (response) => {
          this.mensaje = 'Usuario creado con éxito';
          console.log('Respuesta:', response);
        },
        error: (err) => {
          this.mensaje = err.error.mensaje || 'Error al crear usuario';
          console.error(err);
        },
      });
    } else {
      this.mensaje = 'Por favor, complete todos los campos';
    }
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
    this.mensaje = null;
  }
}
