import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AddClubComponent } from './add-club/add-club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubComponent } from './club/club.component';
import { FilterPipe } from './pipes/filter.pipe';
import { BlogsComponent } from './add-blogs/blogs.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { CategoriePipe } from './pipes/categorie.pipe';
import { OrdrePipe } from './pipes/ordre.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    AddClubComponent,
    ClubsComponent,
    ClubComponent,
    FilterPipe,
    BlogsComponent,
    BlogComponent,

    CategoriePipe,
     OrdrePipe,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 1000,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
