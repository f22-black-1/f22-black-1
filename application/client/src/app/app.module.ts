import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
import { PestsComponent } from './pests/pests.component';
// import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PestsComponent,
    PestDetailComponent,
    // MessagesComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }