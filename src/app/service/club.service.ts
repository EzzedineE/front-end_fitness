import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(private http: HttpClient) {}
  getOneClub(id: string) {
    return this.http.get(`http://localhost:3000/api/club/${id}`);
  }
  modifClub(id: string, club: FormData) {
    return this.http.put(`http://localhost:3000/api/club/${id}`, club);
  }
  addClub(club: FormData) {
    return this.http.post('http://localhost:3000/api/club/', club);
  }
  getClub() {
    return this.http.get('http://localhost:3000/api/club/');
  }
  deleteClub(id: string) {
    return this.http.delete(`http://localhost:3000/api/club/${id}`);
  }
  getImage(imgURL: string) {
    return this.http.get(`http://localhost:3000/static/${imgURL}`);
  }
}
