import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from '../modeles/produit';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css'],
})
export class AddProduitComponent implements OnInit {
  modifModif: Produit;
  produitForm: FormGroup;
  produit: Produit;
  id: string;
  imgURL: any;
  selectedFiles: any;
  urls = new Array<string>();
  constructor(
    private services: ProduitService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.produit = new Produit();
    this.produitForm = new FormGroup({
      titre: new FormControl(this.produit.titre),
      description: new FormControl(this.produit.description),
      categorie: new FormControl(this.produit.categorie),
      prix: new FormControl(this.produit.prix),
      images: new FormControl(this.produit.images),
    });
    if (this.id) {
      this.services.getOneProduit(this.id).subscribe(
        (res: any) => {
          console.log(res);

          this.produitForm.patchValue(this.produit);
          this.produit = res;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  detectFiles(event: any) {
    this.urls = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  add() {
    const newPub = this.produitForm.value;
    const upload = new FormData();
    upload.append('titre', newPub.titre);
    upload.append('description', newPub.description);
    upload.append('categorie', newPub.categorie);
    upload.append('prix', newPub.prix);
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        upload.append('images', file);
      }
    }
    if (this.produit._id) {
      this.services.modifProduit(this.produit._id, upload).subscribe(
        (res) => {
          console.log(res);
          let message = this.toastr.success('Modification valider').onHidden;
          message.subscribe(() => {
            this.router.navigate(['clubs']);
          });

          this.toastr.success('Ajout valider');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.services.addProduit(upload).subscribe(
        (res) => {
          let message = this.toastr.success('Ajout club valider').onHidden;
          message.subscribe(() => {
            this.router.navigate(['clubs']);
          });
        },
        (err) => {
          console.log('err:', err);
          this.toastr.error(err);
        }
      );
    }
  }
}
