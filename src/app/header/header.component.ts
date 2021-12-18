import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user = this.serviceUser.getuser();
  constructor(private serviceUser: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.serviceUser.logout();
    this.router.navigate(['/login']);
  }
}
