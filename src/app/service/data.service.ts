import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modeles/userModele';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  stripePayment(body: any) {
    return this.http.post('http://localhost:3000/api/stripe/payment', body);
  }
}
