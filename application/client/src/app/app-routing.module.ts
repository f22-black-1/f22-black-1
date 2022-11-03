import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PestsComponent } from './pests/pests.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { ExpandedDiscussionViewComponent } from './expanded-discussion-view/expanded-discussion-view.component';
import { PestReportComponent } from './pest-report/pest-report.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PestDetailComponent },
  { path: 'pests', component: PestsComponent },
  { path: 'pests/:id', component: PestsComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'expanded-discussion-view', component: ExpandedDiscussionViewComponent},
  { path: 'report', component: PestReportComponent },

  // This route is for testing CRUD operations on the PEST Object (See Video Demo from 14 Oct 2022)
  { path: 'pest_crud_test', component: PestsComponent },

  //This route is for testing CRUD operations on the Activity object
  { path: 'activity_crud_test', component: ActivityComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}