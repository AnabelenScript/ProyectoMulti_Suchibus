import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalesListComponent } from './terminales/terminales-list/terminales-list.component';
import { AgregarterminalComponent } from './terminales/agregarterminal/agregarterminal.component';
import { TerminalComponent } from './terminales/terminal/terminal.component';
import { UnidadesListComponent } from './unidades/unidades-list/unidades-list.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { AggChoferComponent } from './users/choferes/agg-chofer/agg-chofer.component';
import { ListChoferesComponent } from './users/choferes/list-choferes/list-choferes.component';
import { authGuard } from './auth.guard';
import { AggAdministradoresComponent } from './users/administradores/agg-administradores/agg-administradores.component';
import { ListAdministradoresComponent } from './users/administradores/list-administradores/list-administradores.component';

const routes: Routes = [
  { path: '', component: IniciarSesionComponent },
  { path: 'terminales', component: TerminalesListComponent, canActivate: [authGuard] },
  { path: 'agregarTerminal', component: AgregarterminalComponent, canActivate: [authGuard] },
  { path: 'terminal/:id', component: TerminalComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/terminales', pathMatch: 'full' },
  { path: 'unidadeslist/:terminalId', component: UnidadesListComponent, canActivate: [authGuard] },
  { path: 'registrarChofer', component: AggChoferComponent, canActivate: [authGuard] },
  { path: 'mostrarChoferes', component: ListChoferesComponent, canActivate: [authGuard] },
  {path: 'registrarAdministrador', component: AggAdministradoresComponent, canActivate: [authGuard]},
  {path: 'mostrarAdministradores', component: ListAdministradoresComponent, canActivate: [authGuard]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
