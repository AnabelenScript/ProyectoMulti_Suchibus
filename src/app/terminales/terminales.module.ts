import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalesListComponent } from './terminales-list/terminales-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { AgregarterminalComponent } from './agregarterminal/agregarterminal.component';




@NgModule({
  declarations: [
    TerminalesListComponent,
    AgregarterminalComponent
   
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
   TerminalesListComponent,
   AgregarterminalComponent
  ],
  providers: []
})
export class TerminalesModule { }
