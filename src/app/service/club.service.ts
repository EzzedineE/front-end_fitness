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

  getHoraire() {
    return this.http.get('http://localhost:3000/api/horaire/');
  }
  sendMessage(body: any) {
    return this.http.post('http://localhost:3000/api/email/text', body);
  }

  abonnement(id: string, prix: any, condidat: any) {
    return this.http.post(`http://localhost:3000/api/club/payment/${id}`, {
      prix,
      condidat,
    });
  }
  addCour(id: string, body: any) {
    return this.http.post(`http://localhost:3000/api/club/cours/${id}`, body);
  }
  getCour() {
    return this.http.get(`http://localhost:3000/api/cours/cour`);
  }
  addForfait(id: string, body: any) {
    return this.http.post(
      `http://localhost:3000/api/club/forfaits/${id}`,
      body
    );
  }
  getForfait() {
    return this.http.get('http://localhost:3000/api/forfait/forfait');
  }
}
