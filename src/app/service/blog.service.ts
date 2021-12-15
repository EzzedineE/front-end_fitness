import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  getOneBlog(id: string) {
    return this.http.get(`http://localhost:3000/api/blog/${id}`);
  }
  modifBlog(id: string, blog: FormData) {
    return this.http.put(`http://localhost:3000/api/blog/${id}`, blog);
  }
  addBlog(blog: FormData) {
    return this.http.post('http://localhost:3000/api/blog/', blog);
  }
  getBlog() {
    return this.http.get('http://localhost:3000/api/blog/');
  }
  deleteBlog(id: string) {
    return this.http.delete(`http://localhost:3000/api/blog/${id}`);
  }
}
