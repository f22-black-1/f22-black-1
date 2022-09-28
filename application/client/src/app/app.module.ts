
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
import { PestsComponent } from './pests/pests.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    LoginComponent,
    RegisterComponent,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PestsComponent,
    PestDetailComponent,
    MapComponent,
  ],
  exports: [
    GoogleMapsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }