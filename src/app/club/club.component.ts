import { APP_ID, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from '../modeles/clubModeles';
import { Commentaire } from '../modeles/commentaireMode';
import { User } from '../modeles/userModele';
import { AuthService } from '../service/auth.service';
import { ClubService } from '../service/club.service';
import { CommentaireService } from '../service/commentaire.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { Forfait } from '../modeles/forfait';
import { UserService } from '../service/user.service';
import * as moment from 'moment';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  cours: any;
  images = [62, 83, 466, 965, 982, 1043, 738].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );
  semaines = {
    LUNDI: [],
    MARDI: [],
    MERCREDI: [],
    JEUDI: [],
    VENDREDI: [],
    SAMEDI: [],
    DIMANCHE: [],
  };

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  date: any;
  dateINS: any;
  newDate = new Date();
  title = 'testProj';
  paymentHandler: any = null;
  closeResult = '';
  public isCollapsed = true;
  user: User = this.ServiceUser.getuser();
  aaa: any;

  commentaireForm = new FormGroup({
    commentaire: new FormControl(''),
    nom: new FormControl(this.user.nom),
    prenom: new FormControl(this.user.prenom),
    answered: new FormControl(false),
  });

  formCour = new FormGroup({
    titre: new FormControl(''),
    date: new FormControl(''),
    heureDebut: new FormControl(''),
    heureFin: new FormControl(''),
    description: new FormControl(''),
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
  club: any;
  id: string;
  commentaires: Commentaire[];
  forfaits: any;
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
  addCour() {
    let mybody = this.formCour.value;
    let myclub = this.route.snapshot.params['id'];
    this.Service.addCour(myclub, mybody).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  ngOnInit(): void {
    console.log(this.dateINS);

    this.date = moment(this.newDate).format('DD/MM/YYYY');
    this.dateINS = moment(this.user.dateInscription).format('DD/MM/YYYY');
    this.invokeStripe();
    this.id = this.route.snapshot.params['id'];
    this.Service.getOneClub(this.id).subscribe(
      (res: any) => {
        this.club = res;
        this.club.cours.forEach((c) => {
          if (c.date.toUpperCase() == 'LUNDI') {
            this.semaines.LUNDI.push(c);
          }
          if (c.date.toUpperCase() == 'MARDI') {
            this.semaines.MARDI.push(c);
          }
          if (c.date.toUpperCase() == 'MERCREDI') {
            this.semaines.MERCREDI.push(c);
          }
          if (c.date.toUpperCase() == 'JEUDI') {
            this.semaines.JEUDI.push(c);
          }
          if (c.date.toUpperCase() == 'VENDREDI') {
            this.semaines.VENDREDI.push(c);
          }
          if (c.date.toUpperCase() == 'SAMEDI') {
            this.semaines.SAMEDI.push(c);
          }
          if (c.date.toUpperCase() == 'DIMANCHE') {
            this.semaines.DIMANCHE.push(c);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
    // get commentaire
    this.ServiceCommentaire.getCommentaire().subscribe(
      (res: any) => {
        this.commentaires = res;
        this.Service.getOneClub(this.id).subscribe(
          (res: any) => {
            this.club = res;
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
    // get forfait
    this.Service.getForfait().subscribe(
      (res: any) => {
        this.forfaits = res;
        this.Service.getOneClub(this.id).subscribe(
          (res: any) => {
            this.club = res;
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
    let mybody = this.forfaitForm.value;
    let myclub = this.route.snapshot.params['id'];
    this.Service.addForfait(myclub, mybody).subscribe(
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
      .open(content, { ariaLabelledBy: 'modal-basic-title ' })
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
    var res = this.newDate;

    res.setDate(res.getDate() + forfait.période * 30);
    let myclub = this.route.snapshot.params['id'];
    console.log(this.user);

    let mybody = {
      nomClub: myclub,
      nomForfait: forfait.titre,
      prix: forfait.prix,
      dateInscription: res,
    };

    this.serviceUsers.abonnement(myuser._id, mybody).subscribe(
      (res: any) => {
        this.aaa = res;
        this.ServiceUser.setUser(this.aaa);

        console.log(this.aaa);
      },
      (err) => {
        console.log(err);
      }
    );

    this.Service.abonnement(myclub, forfait.prix, this.user.nom).subscribe(
      (res: any) => {
        this.aaa = res;
        console.log(res);
      },
      (err) => {
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
