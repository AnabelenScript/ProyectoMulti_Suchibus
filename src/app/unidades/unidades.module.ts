import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesListComponent } from './unidades-list/unidades-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UnidadesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    UnidadesListComponent
  ]
})
export class UnidadesModule { }
