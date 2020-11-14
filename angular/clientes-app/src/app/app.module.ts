import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//IMPORTS COMPONENTES (Adicionar el nuevo componente)
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router'; //rutas

//MAPEO DE RUTAS //rutas
const routes: Routes=[
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes',component: ClientesComponent},
];

@NgModule({
  //DECLARACION DE COMPONENTES (Adicionar el nuevo componente)
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes) //rutas
  ],
  //DECLARACION DE SERVICIO (Adicionar el nuevo servicio)
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
