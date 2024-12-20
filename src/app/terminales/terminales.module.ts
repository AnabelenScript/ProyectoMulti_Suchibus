import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalesListComponent } from './terminales-list/terminales-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { AgregarterminalComponent } from './agregarterminal/agregarterminal.component';
import { MiTerminalComponent } from './mi-terminal/mi-terminal.component';
import { TerminalComponent } from './terminal/terminal.component';
import { RouterLink } from '@angular/router';
import { BAggTerminalComponent } from './terminales-list/botones/b-agg-terminal/b-agg-terminal.component';
import { AuthService } from '../service';
import { ParadasModule } from '../paradas/paradas.module';




@NgModule({
  declarations: [
    TerminalesListComponent,
    AgregarterminalComponent,
    MiTerminalComponent,
    TerminalComponent,
    BAggTerminalComponent
   
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ParadasModule
  ],
  exports:[
   TerminalesListComponent,
   AgregarterminalComponent,
   TerminalComponent
  ],
  providers: []
})
export class TerminalesModule { }
