import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('user'),
  });
  constructor(
    private services: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  register() {
    const newUser = this.userForm.value;
    newUser.role = 'user';
    this.services.register(newUser).subscribe(
      (res) => {
        console.log(res);
        let message = this.toastr.success('inscription valide').onHidden;
        message.subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      (err) => {
        this.toastr.error('E-mail Existant', 'error');
      }
    );
  }
}
