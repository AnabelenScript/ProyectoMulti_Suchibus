import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesListComponent } from './unidades-list/unidades-list.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    UnidadesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  exports:[
    UnidadesListComponent
  ]
})
export class UnidadesModule { }
