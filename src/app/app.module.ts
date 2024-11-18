import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TerminalesModule } from './terminales/terminales.module';
import { UnidadesModule } from './unidades/unidades.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    TerminalesModule,
    UnidadesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
