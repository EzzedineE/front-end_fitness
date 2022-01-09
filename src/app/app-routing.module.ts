import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './add-blogs/blogs.component';
import { AddClubComponent } from './add-club/add-club.component';

import { BlogComponent } from './blog/blog.component';
import { ClubComponent } from './club/club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './gardes/admin.guard';
import { GardeGuard } from './gardes/garde.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // register
  { path: 'register', component: RegisterComponent },
  // home
  { path: '', component: HomeComponent },
  // login
  { path: 'login', component: LoginComponent },
  // ajouter club
  {
    path: 'add-club',
    component: AddClubComponent,
    canActivate: [GardeGuard],
  },
  // modifier club
  {
    path: 'add-club/:id',
    component: AddClubComponent,
    canActivate: [GardeGuard],
  },
  // afficher les clubs
  { path: 'clubs', component: ClubsComponent, canActivate: [GardeGuard] },
  // afficher un club
  { path: 'club/:id', component: ClubComponent, canActivate: [GardeGuard] },
  // ajouter un blog
  {
    path: 'add-blog',
    component: BlogsComponent,
    canActivate: [GardeGuard],
  },
  // modifier blog
  {
    path: 'add-blog/:id',
    component: BlogsComponent,
    canActivate: [GardeGuard],
  },
  // afficher les blogs
  { path: 'blogs', component: BlogComponent, canActivate: [GardeGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [GardeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
