import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../modeles/clubModeles';
import { User } from '../modeles/userModele';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  club: Club;
  id: string;
  Commentaire: string = '';
  user: User;
  constructor(
    private Service: ClubService,
    private ServiceUser: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Service.getOneClub(this.id).subscribe(
      (res: any) => {
        this.club = res;
        console.log(res.nom);
      },
      (err) => {
        console.log(err);
      }
    );

    this.ServiceUser.getOneUserBd(this.user._id).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
