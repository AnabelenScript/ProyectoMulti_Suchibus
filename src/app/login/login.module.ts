import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule



@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  exports:[
    IniciarSesionComponent,
  ]
})
export class LoginModule { }
