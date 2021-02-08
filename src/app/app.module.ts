import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActividadItemComponent } from './actividad-item/actividad-item.component';
import { ActividadDetailComponent } from './actividad-detail/actividad-detail.component';
import { ActividadService } from './shared/actividad.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ActividadEditComponent } from './actividad-edit/actividad-edit.component';
import { ActividadData } from './shared/actividad-data';
import { HttpClientModule } from '@angular/common/http';
import { ActividadNewComponent } from './actividad-new/actividad-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    ActividadItemComponent,
    ActividadDetailComponent,
    ActividadEditComponent,
    ActividadNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ActividadData)
  ],
  providers: [ActividadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
