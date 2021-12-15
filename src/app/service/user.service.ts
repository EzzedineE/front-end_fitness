import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getuser() {
    return JSON.parse(localStorage.getItem('userConecter') || 'null');
  }
}
