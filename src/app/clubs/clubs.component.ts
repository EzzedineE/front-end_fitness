import { Component, OnInit } from '@angular/core';
import { Club } from '../modeles/clubModeles';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
})
export class ClubsComponent implements OnInit {
  clubs: Club[];
  rechercher: string = '';
  charger: boolean;
  constructor(private Service: ClubService) {}

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
          console.log(res);
          this.clubs = this.clubs.filter((club) => club._id != id);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
