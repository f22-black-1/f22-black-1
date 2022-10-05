
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { PestDetailComponent } from './pest-detail/pest-detail.component';
<<<<<<< Updated upstream
import { PestsComponent } from './pests/pests.component';
// import { MessagesComponent } from './messages/messages.component';
=======
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
>>>>>>> Stashed changes

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';
=======
import { MapComponent } from './map/map.component';
import { PestsComponent } from './pests/pests.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

>>>>>>> main

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
<<<<<<< Updated upstream
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
)
=======
    GoogleMapsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
>>>>>>> Stashed changes
=======
    GoogleMapsModule
>>>>>>> main
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PestsComponent,
    PestDetailComponent,
<<<<<<< HEAD
    LoginComponent,
<<<<<<< Updated upstream
    // MessagesComponent
=======
    RegisterComponent,
    ForumComponent,
    NavComponent,
  ],
  exports: [
    //GoogleMapsModule
>>>>>>> Stashed changes
=======
    MapComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
  ],
  exports: [
    //GoogleMapsModule
>>>>>>> main
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }