import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  conectedUser = new FormGroup({
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private services: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  login() {
    this.services
      .login(this.conectedUser.value.email, this.conectedUser.value.password)
      .subscribe(
        (res: any) => {
          this.services.setUser(res.user);
          let message = this.toastr.success('connexion success').onHidden;
          message.subscribe(() => {
            this.router.navigate(['']);
          });
        },
        (err) => {
          this.toastr.error(
            'L’adresse e-mail ou le mot de passe entré est incorrect',
            'error'
          );
        }
      );
  }
}
