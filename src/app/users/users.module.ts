import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AggChoferComponent } from './choferes/agg-chofer/agg-chofer.component';
import { ListChoferesComponent } from './choferes/list-choferes/list-choferes.component';
import { AppRoutingModule } from '../app-routing.module';
import { ListAdministradoresComponent } from './administradores/list-administradores/list-administradores.component';
import { AggAdministradoresComponent } from './administradores/agg-administradores/agg-administradores.component';



@NgModule({
  declarations: [
    UserComponent,
    AggChoferComponent,
    ListChoferesComponent,
    ListAdministradoresComponent,
    AggAdministradoresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
