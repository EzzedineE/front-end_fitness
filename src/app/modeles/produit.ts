export class Produit {
  _id: string;
  titre: string;
  description: string;
  categorie: string;
  prix: number;
  images: string;

  constructor(
    _id: string = '',
    titre: string = '',
    description: string = '',
    categorie: string = '',
    prix: number = 0,
    images: string = ''
  ) {
    (this.titre = titre),
      (this.description = description),
      (this.categorie = categorie),
      (this.prix = prix),
      (this._id = _id),
      (this.images = images);
  }
}
