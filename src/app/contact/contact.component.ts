import { Component, OnInit } from '@angular/core';
import { Club } from '../modeles/clubModeles';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  clubs: Club[];

  constructor(private Service: ClubService) {}

  ngOnInit(): void {
    this.Service.getClub().subscribe(
      (res: any) => {
        this.clubs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
