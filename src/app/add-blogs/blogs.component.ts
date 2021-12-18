import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../modeles/blogModele';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  id: string;
  blog: Blog;
  blogForm: FormGroup;
  imgURL: any;
  selectedFiles: any;
  urls = new Array<string>();
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private services: BlogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blog = new Blog();
    this.blogForm = new FormGroup({
      titre: new FormControl(this.blog.titre),
      description: new FormControl(this.blog.description),
      images: new FormControl(null, { validators: [Validators.required] }),
    });
    if (this.id) {
      this.services.getOneBlog(this.id).subscribe(
        (res: any) => {
          this.blog = res;
          console.log(this.blog.description);

          this.blogForm.patchValue(this.blog);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  detectFiles(event: any) {
    this.urls = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  add() {
    const newPub = this.blogForm.value;
    const upload = new FormData();
    upload.append('titre', newPub.titre);
    upload.append('description', newPub.description);
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        upload.append('images', file);
      }
    }
    if (this.blog._id) {
      this.services.modifBlog(this.blog._id, upload).subscribe(
        (res) => {
          console.log(res);
          let message = this.toastr.success('Modification valider').onHidden;
          message.subscribe(() => {
            this.router.navigate(['blogs']);
          });

          this.toastr.success('Ajout valider');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.services.addBlog(upload).subscribe(
        (res) => {
          let message = this.toastr.success('Ajout blog valider').onHidden;
          message.subscribe(() => {
            this.router.navigate(['blogs']);
          });
        },
        (err) => {
          console.log('err:', err);
          this.toastr.error(err);
        }
      );
    }
  }
  
}
