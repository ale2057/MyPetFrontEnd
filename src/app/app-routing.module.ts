import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PetAdminComponent } from './Components/pet-admin/pet-admin.component';
import { PetDetailComponent } from './Components/pet-detail/pet-detail.component';

const routes: Routes = [
  // DEFAULT ROUTES
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'ficha-mascota/:petId',
    component: PetDetailComponent,
  },
  {
    path: 'administracion',
    component: PetAdminComponent,
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
