import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getOneUser(id: string) {
    return this.http.get(`http://localhost:3000/api/user/${id}`);
  }

  getuser() {
    return JSON.parse(localStorage.getItem('userConecter') || 'null');
  }
  like(id: string, aime: any) {
    return this.http.post(`http://localhost:3000/api/user/${id}`, { aime });
  }
  dislike(id: string, aime: any) {
    return this.http.post(`http://localhost:3000/api/user/delete/${id}`, {
      aime,
    });
  }
  abonnement(id: string, body: any) {
    console.log(id, body);
    return this.http.post(`http://localhost:3000/api/user/abonnement/${id}`, {
      body,
    });
    // .subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
