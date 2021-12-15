import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './add-blogs/blogs.component';
import { AddClubComponent } from './add-club/add-club.component';
import { BlogComponent } from './blog/blog.component';
import { ClubComponent } from './club/club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { AdminGuard } from './gardes/admin.guard';
import { GardeGuard } from './gardes/garde.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'add-club',
    component: AddClubComponent,
    canActivate: [GardeGuard],
  },
  {
    path: 'add-club/:id',
    component: AddClubComponent,
    canActivate: [GardeGuard],
  },
  { path: 'clubs', component: ClubsComponent, canActivate: [GardeGuard] },
  { path: 'club/:id', component: ClubComponent, canActivate: [GardeGuard] },
  {
    path: 'add-blog',
    component: BlogsComponent,
    canActivate: [GardeGuard],
  },
  {
    path: 'add-blog/:id',
    component: BlogsComponent,
    canActivate: [GardeGuard],
  },
  { path: 'blogs', component: BlogComponent, canActivate: [GardeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
