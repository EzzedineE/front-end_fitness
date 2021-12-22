import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  constructor(private http: HttpClient) {}
  getOneProduit(id: string) {
    return this.http.get(`http://localhost:3000/api/produit/${id}`);
  }
  modifProduit(id: string, produit: FormData) {
    return this.http.put(`http://localhost:3000/api/produit/${id}`, produit);
  }
  addProduit(produit: FormData) {
    return this.http.post('http://localhost:3000/api/produit/', produit);
  }
  getProduit() {
    return this.http.get('http://localhost:3000/api/produit/');
  }
  deleteProduit(id: string) {
    return this.http.delete(`http://localhost:3000/api/produit/${id}`);
  }
}
