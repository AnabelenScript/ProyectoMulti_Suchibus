import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalesListComponent } from './terminales/terminales-list/terminales-list.component';
import { AgregarterminalComponent } from './terminales/agregarterminal/agregarterminal.component';
import { TerminalComponent } from './terminales/terminal/terminal.component';

const routes: Routes = [
  {path:'',component: TerminalesListComponent},
  {path:'agregarTerminal',component:AgregarterminalComponent},
  { path: 'terminal/:id', component: TerminalComponent },
  { path: '', redirectTo: '/terminales', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
