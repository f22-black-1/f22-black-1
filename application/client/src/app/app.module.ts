
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';//added for filter checkboxes
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { PestsComponent } from './pests/pests.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from './filter/filter.component';
import { ExpandedDiscussionViewComponent } from './expanded-discussion-view/expanded-discussion-view.component';
import { PestReportComponent } from './pest-report/pest-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { PestUpdateComponent } from './pest-update/pest-update.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivityComponent } from './activity/activity.component';
import { PestInfoComponent } from './pest-info/pest-info.component'



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,//added ReactiveFormsModule
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PestsComponent,
    PestDetailComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
    NavComponent,
    FilterComponent,
    ExpandedDiscussionViewComponent,
    PestReportComponent,
    PestUpdateComponent,
    ActivityComponent,
    PestInfoComponent,
  ],
  exports: [
    //GoogleMapsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
