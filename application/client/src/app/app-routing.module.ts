import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PestsComponent } from './pests/pests.component';
import { PestDetailComponent } from './pest-detail/pest-detail.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
<<<<<<< Updated upstream
=======
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
>>>>>>> Stashed changes
=======
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
>>>>>>> main

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PestDetailComponent },
  { path: 'pests', component: PestsComponent },
<<<<<<< HEAD
  { path: 'login', component: LoginComponent }
=======
  { path: 'pests/:id', component: PestsComponent },
  { path: 'map', component: MapComponent },
  //New
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

>>>>>>> main
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}