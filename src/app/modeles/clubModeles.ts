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
  cours: [];
  toutJour: string;
  weekend: string;
  likes: number;
  constructor(
    _id: string = '',
    nom: string = '',
    description: string = '',
    images: string = '',
    address: string = '',
    facebook: string = '',
    instagram: string = '',
    email: string = '',
    tel: number = 0,
    cours: [] = [],
    toutJour: string = '',
    weekend: string = '',
    likes: number = 0
  ) {
    (this.nom = nom), (this.description = description);
    (this._id = _id),
      (this.images = images),
      (this.address = address),
      (this.facebook = facebook),
      (this.instagram = instagram),
      (this.email = email),
      (this.tel = tel),
      (this.cours = cours),
      (this.toutJour = toutJour),
      (this.weekend = weekend),
      (this.likes = likes);
  }
}
// export class Cours {
//   titre: string;
//   date: string;
//   heure: string;
//   description: string;

//   constructor(
//     titre: string = '',
//     date: string = '',
//     heure: string = '',
//     description: string = ''
//   ) {
//     this.titre = titre;
//     this.date = date;
//     this.heure = heure;
//     this.description = description;
//   }
// }
