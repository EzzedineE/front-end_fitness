import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClubComponent } from './add-club/add-club.component';
import { ClubComponent } from './club/club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-club', component: AddClubComponent },
  {
    path: 'add-club/:id',
    component: AddClubComponent,
  },
  { path: 'clubs', component: ClubsComponent },
  { path: 'club/:id', component: ClubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
