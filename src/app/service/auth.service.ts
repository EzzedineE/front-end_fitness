import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modeles/userModele';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  register(user: User) {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }
  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem('userConecter');
  }
  getAllUser() {
    return this.http.get('http://localhost:3000/api/user/');
  }
  getOneUserBd(id: string) {
    return this.http.get(`http://localhost:4000/api/user/${id}`);
  }

  setUser(user: User) {
    localStorage.setItem('userConecter', JSON.stringify(user));
  }
  getuser() {
    return JSON.parse(localStorage.getItem('userConecter') || 'null');
  }
}
