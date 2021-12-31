import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../modeles/blogModele';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: Blog[];
  rechercher: string = '';
  charger: boolean;
  constructor(private Service: BlogService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.charger = false;
    this.Service.getBlog().subscribe(
      (res: any) => {
        this.blogs = res;
        this.charger = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(id: string) {
    if (confirm('voulez vous supprimer')) {
      this.Service.deleteBlog(id).subscribe(
        (res: any) => {
          this.blogs = this.blogs.filter((blog) => blog._id != id);
          this.toastr.success('Blog Supprimer');
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.toastr.error(err);
        }
      );
    }
  }
}
