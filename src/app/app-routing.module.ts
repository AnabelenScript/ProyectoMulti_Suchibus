import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalesListComponent } from './terminales/terminales-list/terminales-list.component';
import { AgregarterminalComponent } from './terminales/agregarterminal/agregarterminal.component';

const routes: Routes = [
  {path:'',component: TerminalesListComponent},
  {path:'agregarTerminal',component:AgregarterminalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
