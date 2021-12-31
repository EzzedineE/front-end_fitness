import { APP_ID, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../modeles/clubModeles';
import { Commentaire } from '../modeles/commentaireMode';
import { User } from '../modeles/userModele';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';
import { CommentaireService } from '../service/commentaire.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Forfait } from '../modeles/forfait';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  newDate = new Date();
  title = 'testProj';
  paymentHandler: any = null;
  closeResult = '';
  public isCollapsed = true;
  user: User = this.ServiceUser.getuser();

  commentaireForm = new FormGroup({
    commentaire: new FormControl(''),
    nom: new FormControl(this.user.nom),
    prenom: new FormControl(this.user.prenom),
    answered: new FormControl(false),
  });

  forfaitForm = new FormGroup({
    titre: new FormControl(''),
    prix: new FormControl(''),
    période: new FormControl(''),
    description: new FormControl(''),
    machine: new FormControl(''),
  });
  send = new FormGroup({
    object: new FormControl(''),
    message: new FormControl(''),
  });
  modifForm: FormGroup;
  club: Club = new Club();
  id: string;
  commentaires: Commentaire[];
  forfaits: Forfait[];
  commen: Commentaire;
  id1: string;
  strCopy: any;
  constructor(
    private Service: ClubService,
    private ServiceUser: AuthService,
    private serviceUsers: UserService,
    private route: ActivatedRoute,
    private ServiceCommentaire: CommentaireService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    console.log(this.user.dateInscription);

    // get club
    this.invokeStripe();
    this.id = this.route.snapshot.params['id'];
    this.Service.getOneClub(this.id).subscribe(
      (res: any) => {
        // this.strCopy = JSON.stringify(res.cours[0]).split(',');
        // for (let i = 0; i <= res.cours.length + 1; i++) {
        //   this.strCopy[i] = this.strCopy[i].split('[').join('');
        //   this.strCopy[i] = this.strCopy[i].split(']').join('');
        //   this.strCopy[i] = this.strCopy[i].split('"').join('');
        // }

        this.club = res;
      },
      (err) => {
        console.log(err);
      }
    );
    // get commentaire
    this.ServiceCommentaire.getCommentaire().subscribe(
      (res: any) => {
        this.commentaires = res;
      },
      (err) => {
        console.log(err);
      }
    );
    // get forfait
    this.Service.getForfait().subscribe(
      (res: any) => {
        this.forfaits = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // open add forfait
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // add forfait
  testmodal() {
    let frais = this.forfaitForm.value;
    this.Service.addForfait(frais).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  salle() {
    window.scrollTo(0, 500);
  }
  contact() {
    window.scrollTo(0, 1200);
  }
  // send email
  sendEmail() {
    console.log(this.club.email);
    this.Service.sendMessage({
      to: this.club.email,
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
  // send commentaire
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
  // delete comentaire
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
  // modif commentaire
  modifier(j: number) {
    this.commentaires[j].answered = true;
    this.modifForm = new FormGroup({
      commentaire: new FormControl(this.commentaires[j].commentaire),
      nom: new FormControl(this.user.nom),
      prenom: new FormControl(this.user.prenom),
      answered: new FormControl(false),
    });
  }
  // send modif comentaire
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
  //  payment
  makePayment(myuser: any, forfait: any, content: any, club: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KBe3hJ2Zk7U8aNcgRQ308NV8l9WU9YqFjqSZ7snPBpi7V1ps0s7foqQdNFi8nQMBw7OZz3igS1tjal39gRt7b5t00T7eV80Yh',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
      },
    });
    paymentHandler.open({
      name: 'Technicall Adda',
      description: '4 products Added',
      prix: forfait.frais * 100,
    });
  }
  validation(myuser: any, forfait: Forfait) {
    var res = new Date();
    console.log(forfait.période);

    res.setDate(res.getDate() + forfait.période * 30);
    let myclub = this.route.snapshot.params['id'];
    let mybody = {
      nomClub: myclub,
      type: forfait.titre,
      prix: forfait.prix,
      dateInscription: res,
    };
    console.log(mybody);

    this.serviceUsers.abonnement(myuser._id, mybody).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  // paiment
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
