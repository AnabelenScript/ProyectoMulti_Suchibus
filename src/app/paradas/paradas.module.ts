import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasListComponent } from './paradas-list/paradas-list.component';
import { SafeUrlPipe } from './safe-url-pipe';



@NgModule({
  declarations: [
    ParadasListComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [SafeUrlPipe]
})
export class ParadasModule { }
