import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../modeles/clubModeles';
import { User } from '../modeles/userModele';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
})
export class ClubsComponent implements OnInit {
  i: number;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  club: Club = new Club();
  user = this.serviceUser.getuser();
  clubs: Club[];
  rechercher: string = '';
  charger: boolean;
  jaime: boolean = false;
  aimer: number = 0;
  users: User[];
  userConect: any;
  id: string;
  forfait: any;
  send = new FormGroup({
    object: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
    private Service: ClubService,
    private seviceUser: UserService,
    private serviceUser: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.charger = false;
    this.getClubs();
    this.getOneUser();
    this.getForfait();
  }

  //getOneUser Function
  getOneUser() {
    this.seviceUser.getOneUser(this.seviceUser.getuser()._id).subscribe(
      (res: any) => {
        this.userConect = res;
        // console.log(this.userConect.mylikes);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getForfait() {
    this.Service.getForfait().subscribe(
      (res: any) => {
        this.forfait = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //get All clubs function
  getClubs() {
    this.Service.getClub().subscribe(
      (res: any) => {
        this.clubs = res;
        this.charger = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //send mail function
  sendEmail() {
    this.Service.sendMessage({
      to: 'ezzedine.elechi@gmail.com',
      subject: this.send.value.object,
      text: this.send.value.message,
    }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //delete club function
  delete(id: string) {
    if (confirm('voulez vous supprimer')) {
      this.Service.deleteClub(id).subscribe(
        (res: any) => {
          this.clubs = this.clubs.filter((club) => club._id != id);
          this.toastr.success('Club Supprimer');
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.toastr.error(err);
        }
      );
    }
  }

  //like function
  like(id: string) {
    let aa = this.userConect._id;
    this.seviceUser.like(aa, id).subscribe(
      (res: any) => {
        this.userConect = res;
        this.getClubs();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Dislike function
  dislike(id: string) {
    let aa = this.userConect._id;
    this.seviceUser.dislike(aa, id).subscribe(
      (res: any) => {
        this.userConect = res;
        this.getClubs();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
