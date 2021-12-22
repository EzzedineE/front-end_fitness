import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../modeles/clubModeles';
import { Commentaire } from '../modeles/commentaireMode';
import { User } from '../modeles/userModele';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';
import { CommentaireService } from '../service/commentaire.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  user: User = this.ServiceUser.getuser();
  commentaireForm = new FormGroup({
    commentaire: new FormControl(''),
    nom: new FormControl(this.user.nom),
    prenom: new FormControl(this.user.prenom),
    answered: new FormControl(false),
  });
  modifForm: FormGroup;
  club: Club = new Club();
  id: string;
  commentaires: Commentaire[];
  commen: Commentaire;
  id1: string;
  constructor(
    private Service: ClubService,
    private ServiceUser: AuthService,
    private route: ActivatedRoute,
    private ServiceCommentaire: CommentaireService,
    private toastr: ToastrService
  ) {}

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
    this.ServiceCommentaire.getCommentaire().subscribe(
      (res: any) => {
        this.commentaires = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  envoyer() {
    let comment = this.commentaireForm.value;
    this.ServiceCommentaire.addCommentaire(comment).subscribe(
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
      this.ServiceCommentaire.deleteCommentaire(id).subscribe(
        (res: any) => {
          this.commentaires = this.commentaires.filter(
            (commentaire) => commentaire._id != id
          );
          this.toastr.success('Commentaire Supprimer');
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.toastr.error(err);
        }
      );
    }
  }
  modifier(j: number) {
    this.commentaires[j].answered = true;
    this.modifForm = new FormGroup({
      commentaire: new FormControl(this.commentaires[j].commentaire),
      nom: new FormControl(this.user.nom),
      prenom: new FormControl(this.user.prenom),
      answered: new FormControl(false),
    });
  }

  envoyerModif(k: number) {
    let comm = this.modifForm.value.commentaire;
    console.log(this.commentaires[k]._id);
    console.log(comm);
    this.commentaires[k].commentaire = comm;
    this.ServiceCommentaire.modifCommentaire(
      this.commentaires[k]._id,
      this.commentaires[k]
    ).subscribe(
      (res) => {
        console.log(res);
        this.commentaires[k].answered = false;
        this.toastr.success('Commentaire Modifier');
      },
      (err) => {
        console.log(err);
        this.toastr.error('E-mail Existant', 'error');
      }
    );
  }
}
