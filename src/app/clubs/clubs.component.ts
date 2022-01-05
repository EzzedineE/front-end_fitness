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
    this.Service.getClub().subscribe(
      (res: any) => {
        this.clubs = res;
        this.charger = true;
      },
      (err) => {
        console.log(err);
      }
    );
    this.seviceUser.getOneUser(this.seviceUser.getuser()._id).subscribe(
      (res: any) => {
        this.userConect = res;
        // console.log(this.userConect.mylikes);
      },
      (err) => {
        console.log(err);
      }
    );
    this.Service.getForfait().subscribe(
      (res: any) => {
        this.forfait = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
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
  like(id: string) {
    let aa = this.userConect._id;
    this.seviceUser.like(aa, id).subscribe(
      (res: any) => {
        this.userConect = res;
        this.Service.getClub().subscribe(
          (res: any) => {
            this.clubs = res;
            this.charger = true;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  dislike(id: string) {
    let aa = this.userConect._id;
    this.seviceUser.dislike(aa, id).subscribe(
      (res: any) => {
        this.userConect = res;
      },
      (err) => {
        console.log(err);
      }
    );
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

  totop() {
    console.log('tesssssst');
    window.scrollTo(0, 0);
  }
}
