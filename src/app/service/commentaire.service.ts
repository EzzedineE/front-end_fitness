import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commentaire } from '../modeles/commentaireMode';
import { User } from '../modeles/userModele';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  constructor(private http: HttpClient) {}
  addCommentaire(commetaire: any) {
    console.log(commetaire);
    return this.http.post('http://localhost:3000/api/commentaire/', commetaire);
  }
  getCommentaire() {
    return this.http.get('http://localhost:3000/api/commentaire/');
  }
  modifCommentaire(id: string, commentaire: any) {
    return this.http.put(
      `http://localhost:3000/api/commentaire/${id}`,
      commentaire
    );
  }
  deleteCommentaire(id: string) {
    return this.http.delete(`http://localhost:3000/api/commentaire/${id}`);
  }
}
