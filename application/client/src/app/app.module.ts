import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
import { PestsComponent } from './pests/pests.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { PostRequestTypedComponent } from './post-request/post-request.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PestsComponent,
    PestDetailComponent,
    PostRequestTypedComponent,
    // MessagesComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }