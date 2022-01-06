import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  apiGet(endpoint) {
    return this.http.get(this.apiUrl + endpoint);
  }

  getuser() {
    return JSON.parse(localStorage.getItem('userConecter') || 'null');
  }

  apiPost(endpoint, body) {
    return this.http.post(this.apiUrl + endpoint, body);
  }
  apiPut(endpoint, body) {
    return this.http.put(this.apiUrl + endpoint, body);
  }
  apiDelete(endpoint) {
    return this.http.delete(this.apiUrl + endpoint);
  }
}
