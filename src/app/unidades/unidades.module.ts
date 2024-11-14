import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesListComponent } from './unidades-list/unidades-list.component';



@NgModule({
  declarations: [
    UnidadesListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UnidadesListComponent
  ]
})
export class UnidadesModule { }
