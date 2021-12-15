import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../modeles/clubModeles';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
})
export class ClubsComponent implements OnInit {
  user = this.serviceUser.getuser();
  clubs: Club[];
  rechercher: string = '';
  charger: boolean;
  constructor(
    private Service: ClubService,
    private serviceUser: AuthService,
    private toastr: ToastrService
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
}
