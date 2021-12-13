import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../modeles/clubModeles';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css'],
})
export class AddClubComponent implements OnInit {
  id: string;
  club: Club;
  clubForm: FormGroup;
  imgURL: any;
  selectedFiles: any;
  urls = new Array<string>();
  constructor(
    private services: ClubService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.club = new Club();
    this.clubForm = new FormGroup({
      nom: new FormControl(this.club.nom),
      address: new FormControl(this.club.address),
      description: new FormControl(this.club.description),
      images: new FormControl(null, { validators: [Validators.required] }),
      facebook: new FormControl(this.club.facebook),
      instagram: new FormControl(this.club.instagram),
      email: new FormControl(this.club.email),
      tel: new FormControl(this.club.tel),
    });
    if (this.id) {
      this.services.getOneClub(this.id).subscribe(
        (res: any) => {
          this.club = res;
          this.clubForm.patchValue(this.club);
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
    const newPub = this.clubForm.value;
    const upload = new FormData();
    upload.append('nom', newPub.nom);
    upload.append('description', newPub.description);
    upload.append('address', newPub.address);
    upload.append('facebook', newPub.facebook);
    upload.append('instagram', newPub.instagram);
    upload.append('email', newPub.email);
    upload.append('tel', newPub.tel);
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        upload.append('images', file);
      }
    }
    if (this.club._id) {
      this.services.modifClub(this.club._id, upload).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['clubs']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.services.addClub(upload).subscribe(
        (res) => {
          console.log('res:', res);
          this.router.navigate(['clubs']);
        },
        (err) => {
          console.log('err:', err);
        }
      );
    }
  }
}
