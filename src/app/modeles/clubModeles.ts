export class Club {
  _id: string;
  nom: string;
  description: string;
  images: string;
  address: string;
  facebook: string;
  instagram: string;
  email: string;
  tel: number;
  constructor(
    _id: string = '',
    nom: string = '',
    description: string = '',
    images: string = '',
    address: string = '',
    facebook: string = '',
    instagram: string = '',
    email: string = '',
    tel: number = 0
  ) {
    (this.nom = nom), (this.description = description);
    (this._id = _id),
      (this.images = images),
      (this.address = address),
      (this.facebook = facebook),
      (this.instagram = instagram),
      (this.email = email),
      (this.tel = tel);
  }
}
