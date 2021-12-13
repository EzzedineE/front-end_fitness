import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../modeles/clubModeles';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  club: Club;
  id: string;

  constructor(private Service: ClubService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Service.getOneClub(this.id).subscribe(
      (res: any) => {
        this.club = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // getUrl() {
  //   // return "url('http://localhost:3000/static/'+)";
  //   return `url( http://localhost:3000/static/${this.club.images[1]})`;
  // }
}
